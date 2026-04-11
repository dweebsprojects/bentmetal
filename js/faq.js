document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product-button");
    const faqGroups = document.querySelectorAll(".faq-group");
    const allFaqItems = document.querySelectorAll(".faq");
    const searchInput = document.getElementById("faq-search");
    const VISIBLE_LIMIT = 4;

    // Show More / Show Less — wrap overflow items for animated expand
    document.querySelectorAll(".faq-container").forEach(container => {
        const faqs = [...container.querySelectorAll(".faq")];
        const btn = container.querySelector(".show-more-btn");
        if (!btn || faqs.length <= VISIBLE_LIMIT) {
            if (btn) btn.style.display = "none";
            return;
        }

        // Wrap items beyond limit in an animated overflow container
        const overflow = document.createElement("div");
        overflow.className = "faq-overflow";
        const inner = document.createElement("div");
        inner.className = "faq-overflow-inner";

        faqs.slice(VISIBLE_LIMIT).forEach(faq => inner.appendChild(faq));
        overflow.appendChild(inner);
        // Insert before the show-more button
        container.insertBefore(overflow, btn);

        btn.addEventListener("click", () => {
            const expanded = container.classList.toggle("expanded");
            if (!expanded) {
                // Close any open items inside the collapsed region
                inner.querySelectorAll(".faq.active").forEach(faq => {
                    faq.classList.remove("active");
                    faq.querySelector(".faq-answer").style.maxHeight = null;
                });
            }
            btn.textContent = expanded ? "Show Less" : "Show More";
        });
    });

    // Open Eavestroughs by default
    const defaultBtn = document.getElementById("eavestrough");
    if (defaultBtn) {
        defaultBtn.classList.add("button-active");
        const targetGroup = document.getElementById(defaultBtn.getAttribute("data-target"));
        if (targetGroup) targetGroup.style.display = "block";
    }

    // Product button toggling
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            if (!targetId) return;

            buttons.forEach(btn => btn.classList.remove("button-active"));
            button.classList.add("button-active");

            faqGroups.forEach(group => group.style.display = "none");

            const targetGroup = document.getElementById(targetId);
            if (targetGroup) {
                targetGroup.style.display = "block";
            }
        });
    });

    // FAQ accordion
    allFaqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            // Close other open items in the SAME container
            const parentContainer = item.closest(".faq-container");
            parentContainer.querySelectorAll(".faq").forEach(el => {
                el.classList.remove("active");
                el.querySelector(".faq-answer").style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Search
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        const isSearching = query.length > 0;

        // When searching, show all groups and expand all overflow
        if (isSearching) {
            faqGroups.forEach(group => group.style.display = "block");
            buttons.forEach(btn => btn.classList.remove("button-active"));
        } else {
            // Restore: hide groups, re-activate eavestrough
            faqGroups.forEach(group => group.style.display = "none");
            if (defaultBtn) {
                defaultBtn.classList.add("button-active");
                const targetGroup = document.getElementById(defaultBtn.getAttribute("data-target"));
                if (targetGroup) targetGroup.style.display = "block";
            }
        }

        document.querySelectorAll(".faq-container").forEach(container => {
            const faqs = container.querySelectorAll(".faq");
            const btn = container.querySelector(".show-more-btn");

            faqs.forEach(faq => {
                const questionText = faq.querySelector(".faq-question").textContent.toLowerCase();
                const answerText = faq.querySelector(".answer-content").textContent.toLowerCase();
                const matches = !isSearching || questionText.includes(query) || answerText.includes(query);

                if (isSearching) {
                    // Force overflow open during search
                    container.classList.add("search-expanded");
                    if (matches) {
                        faq.classList.remove("hidden");
                    } else {
                        faq.classList.add("hidden");
                        faq.classList.remove("active");
                        faq.querySelector(".faq-answer").style.maxHeight = null;
                    }
                } else {
                    container.classList.remove("search-expanded");
                    faq.classList.remove("hidden");
                }
            });

            if (btn) {
                btn.style.display = isSearching ? "none" : "";
            }
        });

        // Show "no results"
        let noResults = document.getElementById("faq-no-results");
        if (!noResults) {
            noResults = document.createElement("p");
            noResults.id = "faq-no-results";
            noResults.className = "faq-no-results";
            noResults.textContent = "No questions match your search.";
            searchInput.closest(".faq-hero-content").after(noResults);
        }

        const anyVisible = [...allFaqItems].some(
            item => !item.classList.contains("hidden")
        );
        noResults.style.display = (isSearching && !anyVisible) ? "block" : "none";
    });
});
