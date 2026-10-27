'use strict';
const buttons=[...document.querySelectorAll('[data-doc]')];
for(const button of buttons)button.addEventListener('click',()=>{for(const item of buttons){const active=item===button;item.setAttribute('aria-pressed',String(active));document.getElementById('doc-'+item.dataset.doc).hidden=!active;}});
