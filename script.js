(() => {
    const navToggle = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".nav-list");
    const modals = document.querySelectorAll(".modal");

    function setMenuOpen(open) {
        if (!navToggle || !navList) return;
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        navList.classList.toggle("is-open", open);
    }

    if (navToggle && navList) {
        navToggle.addEventListener("click", () => {
            const open = navToggle.getAttribute("aria-expanded") !== "true";
            setMenuOpen(open);
        });

        navList.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });
    }

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add("is-open");
        modal.removeAttribute("hidden");
        document.body.classList.add("modal-open");
        const closeBtn = modal.querySelector("[data-close]");
        if (closeBtn) closeBtn.focus();
    }

    function closeModal(modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("hidden", "");
        if (![...modals].some((m) => m.classList.contains("is-open"))) {
            document.body.classList.remove("modal-open");
        }
    }

    function closeAllModals() {
        modals.forEach(closeModal);
    }

    document.querySelectorAll("[data-modal]").forEach((btn) => {
        btn.addEventListener("click", () => openModal(btn.getAttribute("data-modal")));
    });

    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal(modal);
        });

        const closeBtn = modal.querySelector("[data-close]");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => closeModal(modal));
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
            setMenuOpen(false);
        }
    });
})();
