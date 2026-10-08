document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const links = document.querySelector(".nav-links");
  if(menu) menu.addEventListener("click",()=>links.classList.toggle("active"));

  document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());

  // Configure WhatsApp/email/phone from config.js
  const cfg = window.TRUVEX_CONFIG || {};
  document.querySelectorAll("[data-phone]").forEach(a=>{
    if(cfg.phone){a.href="tel:+"+cfg.phone;a.textContent=cfg.displayPhone||cfg.phone}
    else {a.href="#contact";a.title="Add the company phone number in config.js"}
  });
  document.querySelectorAll("[data-whatsapp]").forEach(a=>{
    if(cfg.phone) a.href="https://wa.me/"+cfg.phone;
    else {a.href="#contact";a.title="Add the WhatsApp number in config.js"}
  });
  document.querySelectorAll("[data-email]").forEach(a=>{
    if(cfg.email){a.href="mailto:"+cfg.email;a.textContent=cfg.email}
    else {a.href="#contact";a.title="Add the company email in config.js"}
  });

  const form=document.querySelector("#enquiryForm");
  if(form){
    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      const d=new FormData(form);
      const text=`TRUVEX EXIM ENQUIRY%0A%0AName: ${d.get("name")}%0ACompany: ${d.get("company")}%0AEmail: ${d.get("email")}%0APhone/WhatsApp: ${d.get("phone")}%0ARequirement: ${d.get("requirement")}%0AMessage: ${d.get("message")}`;
      if(cfg.phone) window.open("https://wa.me/"+cfg.phone+"?text="+text,"_blank");
      else if(cfg.email) window.location.href="mailto:"+cfg.email+"?subject=TRUVEX EXIM Enquiry&body="+decodeURIComponent(text);
      else alert("Please add the company WhatsApp number or email in config.js before using this form.");
    });
  }
});
