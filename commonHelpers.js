import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m,i as f}from"./assets/vendor-77e16229.js";const h=document.querySelector("#datetime-picker"),o=document.querySelector("button"),p=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),S=document.querySelector("[data-minutes]"),b=document.querySelector("[data-seconds]");let e="";o.disabled=!0;const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){e=t[0],e<new Date&&(e=t[0].getTime());const n=Date.now();e<=n?(f.error({color:"red",message:"Please choose a date in the future",position:"topRight",progressBarColor:"rgb(255, 0, 0)",timeout:3e3}),o.disabled=!0):o.disabled=!1}};m("#datetime-picker",g);o.addEventListener("click",C);let c;function C(){c=setInterval(()=>{const t=e-Date.now();if(t<=0){clearInterval(c);return}D(q(t))},1e3),o.disabled=!0,h.setAttribute("disabled","true")}function q(t){const u=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),d=Math.floor(t%864e5%36e5/6e4),l=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:i,minutes:d,seconds:l}}function r(t){return String(t).padStart(2,"0")}function D({days:t,hours:n,minutes:a,seconds:s}){p.textContent=`${r(t)}`,y.textContent=`${r(n)}`,S.textContent=`${r(a)}`,b.textContent=`${r(s)}`}
//# sourceMappingURL=commonHelpers.js.map