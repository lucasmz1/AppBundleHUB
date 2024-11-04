(()=>{document.addEventListener("DOMContentLoaded",()=>{let u=document.getElementById("app-details-modal"),r=document.querySelector(".details-body");window.showAppDetails=function(l,c){let v=c.find(o=>o.name===l);if(v){r.innerHTML=h(v),u.showModal();let o=new URL(window.location);o.searchParams.set("app",l),history.pushState({app:l},"",o)}else console.error("App not found:",l)};function h(l){let c=`
            <div class="animate-pulse">
                <!-- Header skeleton with icon and title -->
                <div class="flex items-start gap-4 mb-6">
                    <div class="skeleton w-16 h-16 rounded-lg"></div>
                    <div class="flex-1">
                        <div class="skeleton h-8 w-48 mb-4"></div>
                        <div class="skeleton h-4 w-full mb-2"></div>
                        <div class="skeleton h-4 w-3/4 mb-4"></div>
                        <div class="flex gap-2">
                            <div class="skeleton h-6 w-20"></div>
                            <div class="skeleton h-6 w-20"></div>
                            <div class="skeleton h-6 w-20"></div>
                        </div>
                    </div>
                </div>

                <!-- Screenshots carousel skeleton -->
                <div class="skeleton w-full h-64 mb-6 rounded-lg"></div>

                <!-- Stats skeleton -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="skeleton h-24 w-full"></div>
                    <div class="skeleton h-24 w-full"></div>
                    <div class="skeleton h-24 w-full"></div>
                </div>

                <!-- Action buttons skeleton -->
                <div class="flex gap-2 mb-6">
                    <div class="skeleton h-12 w-32"></div>
                    <div class="skeleton h-12 w-32"></div>
                    <div class="skeleton h-12 w-32"></div>
                </div>

                <!-- Install section skeleton -->
                <div class="skeleton h-64 w-full rounded-lg"></div>
            </div>
        `;function v(e){let i=e.category?e.category.split(",").map(t=>t.trim()).filter(t=>t).map(t=>`<span class="badge badge-neutral category-tag" data-category="${t}">${t}</span>`).join(""):"",s=new Date(e.build_date).toLocaleDateString("es-AR",{year:"numeric",month:"short",day:"numeric"});return`
                <div class="details-header flex items-start gap-4 mb-4">
                    <img src="${e.icon}" alt="${e.name}" class="app-icon w-16 h-16 object-contain"
                         onerror="this.style.display='none';">
                    <div>
                        <h2 class="text-2xl font-semibold">${e.name}</h2>
                        <p>${e.description||"No description available."}</p>
                        <div class="category-tags flex flex-wrap gap-2 mt-2">${i}</div>
                    </div>
                </div>
                <div id="screenshots-container" class="mb-4">
                    <div class="skeleton-container skeleton h-64">
                        <div class="flex items-center justify-center h-full text-base-content/50">
                            Loading screenshots...
                        </div>
                    </div>
                    <div class="carousel-container hidden"></div>
                </div>
                <div class="stats stats-horizontal shadow w-full bg-base-200 mb-4">
                    <div class="stat">
                        <div class="stat-title">Version</div>
                        <div class="stat-value text-2xl">${e.version||"N/A"}</div>
                        <div class="stat-desc">Latest Release</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">Size</div>
                        <div class="stat-value text-2xl">${e.size}</div>
                        <div class="stat-desc">Download Size</div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">Build Date</div>
                        <div class="stat-value text-2xl">${s}</div>
                        <div class="stat-desc">Last Updated</div>
                    </div>
                </div>
                <div class="app-links flex gap-2 mb-4">
                    <a href="${e.download_url}" class="download-button btn btn-primary">Download</a>
                    ${e.src_url?`<a href="${e.src_url}" class="link-button btn btn-secondary" target="_blank">Source Code</a>`:""}
                    ${e.web_url?`<a href="${e.web_url}" class="link-button btn btn-secondary" target="_blank">Website</a>`:""}
                </div>
                <div class="install-section p-4 bg-base-200 rounded-lg mb-4">
                    <h3 class="text-xl font-semibold mb-2">Install</h3>
                    <h4 class="text-base font-semibold mb-2"># If you don't have <span class="code">dbin</span> installed:</h4>
                    <div class="code bg-base-300 p-2 rounded mb-4">
                        <pre data-prefix="$"><code>wget -qO- "https://raw.githubusercontent.com/xplshn/dbin/master/stubdl" | sh -s -- install ${e.name}</code></pre>
                    </div>
                    <h4 class="text-base font-semibold mb-2"># If you have <span class="code">dbin</span> installed:</h4>
                    <div class="code bg-base-300 p-2 rounded mb-4">
                        <pre data-prefix="$"><code>dbin install ${e.name}</code></pre>
                    </div>
                    <h4 class="text-base font-semibold mb-2"># Alternative using <span class="code">soar</span>:</h4>
                    <div class="code bg-base-300 p-2 rounded">
                        <pre data-prefix="$"><code>soar add ${e.name}</code></pre>
                    </div>
                    <div class="tooltip tooltip-info" data-tip="You must have dbin protocol support on your computer">
                        <a href="dbin://install?${e.name}" class="install-button btn btn-primary mt-4">Install</a>
                    </div>
                </div>
                ${e.note?`<div class="app-note alert alert-warning"><strong>Note:</strong> ${e.note}</div>`:""}
            `}function o(e){if(!Array.isArray(e)||e.length===0)return"<p>No screenshots available.</p>";let i=e.map((n,s)=>new Promise(t=>{let a=new Image;a.onload=()=>t({src:n,index:s,valid:!0}),a.onerror=()=>t({src:n,index:s,valid:!1}),a.src=n}));return Promise.all(i).then(n=>{let s=n.filter(a=>a.valid);if(s.length===0)return"<p>No screenshots available.</p>";let t='<div class="carousel w-full h-64 rounded-lg">';return s.forEach((a,d)=>{let m=(d+1)%s.length,f=(d-1+s.length)%s.length;t+=`
                        <div id="slide${d}" class="carousel-item relative w-full">
                            <img src="${a.src}" class="w-full h-full object-contain cursor-pointer" alt="Screenshot ${d+1}" data-fullscreen-src="${a.src}"/>
                            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide${f}" class="btn btn-circle">\u276E</a>
                                <a href="#slide${m}" class="btn btn-circle">\u276F</a>
                            </div>
                        </div>
                    `}),t+="</div>",t})}return r.innerHTML=c,setTimeout(()=>{r.innerHTML=v(l);let e=document.getElementById("screenshots-container");e&&o(l.screenshots).then(i=>{let n=e.querySelector(".skeleton-container"),s=e.querySelector(".carousel-container");s&&(s.innerHTML=i,n.remove(),s.classList.remove("hidden"),s.querySelectorAll("img").forEach(t=>{t.addEventListener("click",()=>{fullscreenImage.src=t.dataset.fullscreenSrc,imageDialog.showModal()})}),document.querySelectorAll(".carousel-item a").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let d=a.target.getAttribute("href");document.querySelector(d).scrollIntoView({behavior:"smooth"})})}))}),r.querySelectorAll(".category-tag").forEach(i=>{i.addEventListener("click",n=>{let s=n.target.dataset.category;updateCategoryFilter(s)})})},500),c}document.querySelector('form[method="dialog"] button').addEventListener("click",b);function b(){u.close();let l=new URL(window.location);l.searchParams.delete("app"),history.pushState({},"",l)}});})();
//# sourceMappingURL=script.js.map
