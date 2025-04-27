// script.js

// Save Portfolio Data
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("portfolioForm");
    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
  
        const profileImageInput = document.getElementById("profileImageInput");
        const reader = new FileReader();
  
        if (profileImageInput && profileImageInput.files.length > 0) {
          reader.readAsDataURL(profileImageInput.files[0]);
        } else {
          savePortfolioData(null);
        }
  
        reader.onload = function() {
          savePortfolioData(reader.result);
        };
      });
    }
  });
  
  function savePortfolioData(profileImageBase64) {
    const portfolio = {
      name: document.getElementById("name").value,
      profession: document.getElementById("profession").value,
      about: document.getElementById("about").value,
      skills: document.getElementById("skills").value,
      projects: document.getElementById("projects").value,
      contact: document.getElementById("contact").value,
      theme: document.getElementById("theme").value,
      profileImage: profileImageBase64 // base64 profile image
    };
  
    localStorage.setItem("portfolioData", JSON.stringify(portfolio));
    alert("Portfolio Saved Successfully!");
    window.location.href = "view.html";
  }
  
  // Load Portfolio Data
  function loadPortfolio() {
    const data = JSON.parse(localStorage.getItem("portfolioData"));
    if (data) {
      document.getElementById("nameDisplay").innerText = data.name;
      document.getElementById("professionDisplay").innerText = data.profession;
      document.getElementById("aboutDisplay").innerText = data.about;
      document.getElementById("skillsDisplay").innerText = data.skills;
      document.getElementById("projectsDisplay").innerText = data.projects;
      document.getElementById("contactDisplay").innerText = data.contact;
  
      if (data.profileImage) {
        document.getElementById("profileImage").src = data.profileImage;
      }
  
      const card = document.getElementById("profileCard");
      if (data.theme) {
        card.classList.add(data.theme);
      }
    }
  }
  
  // Fill Edit Form
  function fillEditForm() {
    const data = JSON.parse(localStorage.getItem("portfolioData"));
    if (data) {
      document.getElementById("name").value = data.name;
      document.getElementById("profession").value = data.profession;
      document.getElementById("about").value = data.about;
      document.getElementById("skills").value = data.skills;
      document.getElementById("projects").value = data.projects;
      document.getElementById("contact").value = data.contact;
      document.getElementById("theme").value = data.theme;
    }
  }
  
  function downloadPortfolio() {
    const button = document.querySelector(".download-btn");
    if (button) button.style.display = "none"; // Hide the button
  
    const element = document.getElementById("profileCard");
  
    const opt = {
      margin: 0.2,
      filename: 'portfolio.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        if (button) button.style.display = "inline-block"; // Show button back after download
      });
  }
  
  // Detect Edit Form and Update Portfolio
document.addEventListener("DOMContentLoaded", function() {
    const editForm = document.getElementById("editPortfolioForm");
    if (editForm) {
      editForm.addEventListener("submit", function(e) {
        e.preventDefault();
        updatePortfolioData();
      });
    }
  });
  
  function updatePortfolioData() {
    const updatedPortfolio = {
      name: document.getElementById("name").value,
      profession: document.getElementById("profession").value,
      about: document.getElementById("about").value,
      skills: document.getElementById("skills").value,
      projects: document.getElementById("projects").value,
      contact: document.getElementById("contact").value,
      theme: document.getElementById("theme").value
    };
  
    const existingData = JSON.parse(localStorage.getItem("portfolioData"));
    if (existingData && existingData.profileImage) {
      updatedPortfolio.profileImage = existingData.profileImage;
    } else {
      updatedPortfolio.profileImage = null;
    }
  
    localStorage.setItem("portfolioData", JSON.stringify(updatedPortfolio));
    alert("Portfolio Updated Successfully!");
    window.location.href = "view.html";
  }
  function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
  }
  function deletePortfolio() {
    if (confirm("Are you sure you want to delete your portfolio? This cannot be undone.")) {
      localStorage.removeItem("portfolioData");
      alert("Portfolio Deleted Successfully!");
      window.location.href = "create.html"; // Redirect user back to create
    }
  }
  