/** FOUC-safe theme boot — defaults to light for a brighter first paint. */
export const themeInitScript = `(function(){try{var k='avx-theme';var s=localStorage.getItem(k);var t=(s==='dark')?'dark':'light';var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light';}})();`;
