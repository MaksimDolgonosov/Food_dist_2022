"use strict";

window.addEventListener("DOMContentLoaded", () => {
    // Главный таб
    let tabHeaderItems = document.querySelector(".tabheader__items");
    let tabHeaderItem = document.querySelectorAll(".tabheader__item");
    let tabItem = document.querySelectorAll(".tabcontent");


    tabItem.forEach(tab => {
        tab.style.display = "none";
        tab.classList.add("animate__animated", "animate__fadeIn");
    });
    tabHeaderItem.forEach(item => {
        item.classList.remove("tabheader__item_active");
    });
    showTab(0);

    function showTab(n) {
        tabHeaderItem.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
        tabHeaderItem[n].classList.add("tabheader__item_active");

        tabItem.forEach(tab => {
            tab.style.display = "none";
        });
        tabItem[n].style.display = "block";
    }

    tabHeaderItems.addEventListener("click", (element, i) => {


        if (element.target && element.target.classList.contains("tabheader__item")) {
            tabHeaderItem.forEach((item, i) => {
                if (item == element.target) {
                    showTab(i);
                }
            });
        }
    });

    // Слайдер вариант 1
    // const nextBtn = document.querySelector(".offer__slider-next");
    // const prevBtn = document.querySelector(".offer__slider-prev");
    // const slides = document.querySelectorAll(".offer__slide");
    // const slidesWrapper = document.querySelector(".offer__slider-wrapper").;
    // const currentSlide = document.querySelector("#current");
    // const totalSlides = document.querySelector("#total");
    // let customSlide = 0;
    // showSlide(customSlide);
    // currentText(customSlide + 1);
    // totalText(slides.length);
    // slides.forEach(slide => {

    //     slide.classList.add("animate__animated", "animate__fadeIn");
    // });




    // nextBtn.addEventListener("click", () => {
    //     if (customSlide == (slides.length - 1)) {
    //         customSlide = 0;
    //     } else {
    //         customSlide += 1;
    //     }
    //     showSlide(customSlide);
    //     currentText(customSlide + 1);

    // });

    // prevBtn.addEventListener("click", () => {
    //     if (customSlide == 0) {
    //         customSlide = (slides.length - 1);
    //     } else {
    //         customSlide -= 1;
    //     }
    //     showSlide(customSlide);
    //     currentText(customSlide + 1);
    // });



    // function showSlide(i) {
    //     slides.forEach(item => {
    //         item.style.display = "none";
    //     });
    //     slides[i].style.display = "block";
    // }
    // function currentText(c) {
    //     if (c > 9) {
    //         currentSlide.textContent = `${c}`;
    //     } else {
    //         currentSlide.textContent = `0${c}`;
    //     }
    // }
    // function totalText(c) {
    //     if (c > 9) {
    //         totalSlides.textContent = `${c}`;
    //     } else {
    //         totalSlides.textContent = `0${c}`;
    //     }
    // }
    // Слайдер вариант 2
    const nextBtn = document.querySelector(".offer__slider-next");
    const prevBtn = document.querySelector(".offer__slider-prev");
    const slides = document.querySelectorAll(".offer__slide");
    const slidesWrapper = document.querySelector(".offer__slider-wrapper");
    const innerSlider = document.querySelector(".innner_slider");
    const currentSlide = document.querySelector("#current");
    const totalSlides = document.querySelector("#total");
    slidesWrapper.style.position = "relative";
    let offset = 0;
    currentText(offset / 650 + 1);
    totalText(slides.length);


    let width = window.getComputedStyle(slidesWrapper).width;
    innerSlider.style.width = 100 * slides.length + "%";
    slides.forEach(slide => {
        slide.style.width = width;
    });
    innerSlider.style.display = "flex";
    innerSlider.style.transition = ".5s all";
    slidesWrapper.style.overflow = "hidden";

    let indicators = document.createElement("ol");
    indicators.style.cssText = `
    list-style-type: none;
    position: absolute;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    `;
    slidesWrapper.appendChild(indicators);


    nextBtn.addEventListener("click", () => {
        if (offset == +width.replace(/[a-z]/g, "") * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/[a-z]/g, "");
        }
        innerSlider.style.transform = `translateX(-${offset}px)`;
        currentText(offset / 650 + 1);
        showDot(offset / 650);
    });
    prevBtn.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.replace(/[a-z]/g, "") * (slides.length - 1);
        } else {
            offset -= +width.replace(/[a-z]/g, "");


        }
        innerSlider.style.transform = `translateX(-${offset}px)`;
        currentText(offset / 650 + 1);
        showDot(offset / 650);
    });


    function currentText(c) {
        if (c > 9) {
            currentSlide.textContent = `${c}`;
        } else {
            currentSlide.textContent = `0${c}`;
        }
    }
    function totalText(c) {
        if (c > 9) {
            totalSlides.textContent = `${c}`;
        } else {
            totalSlides.textContent = `0${c}`;
        }
    }
    slides.forEach(() => {
        let dot = document.createElement("li");
        dot.classList.add("sliderDots");
        dot.style.cssText = `
        width: 35px;
        height: 5px;
        background-color: white;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
        opacity: .5;
        `;
        indicators.appendChild(dot);
    });


    showDot(0);
    function showDot(i) {
        document.querySelectorAll(".sliderDots").forEach(dot => {
            dot.style.opacity = "0.5";
        });
        document.querySelectorAll(".sliderDots")[i].style.opacity = "1";
    }

    document.querySelectorAll(".sliderDots").forEach((dot, i) => {
        dot.addEventListener("click", () => {
            innerSlider.style.transform = `translateX(-${i * 650}px)`;
            offset = i * 650;
            showDot(i);
            currentText(i + 1);
        });
    });

    // Таймер

    let finalDate = new Date(2022, 7, 12, 20);
    const now = new Date();
    if (finalDate - now <= 0) {
        let timer = document.querySelector(".promotion__timer");
        timer.querySelector("#days").innerHTML = "00";
        timer.querySelector("#hours").innerHTML = "00";
        timer.querySelector("#minutes").innerHTML = "00";
        timer.querySelector("#seconds").innerHTML = "00";
    } else {
        setClock(".promotion__timer");
    }


    function getTimeRemaining(finalDate) {
        const now = new Date();
        let t = finalDate - now;
        let days = Math.floor(t / 60000 / 60 / 24);
        let hours = Math.floor(t / 60000 / 60 % 24);
        let min = Math.floor(t / 60000 % 60);
        let sec = Math.floor(t / 1000 % 60);
        return {
            total: t,
            days: days,
            hours: hours,
            min: min,
            sec: sec
        };
    }


    function setClock(selector) {
        let timer = document.querySelector(selector);
        let days = timer.querySelector("#days");
        let hours = timer.querySelector("#hours");
        let minutes = timer.querySelector("#minutes");
        let seconds = timer.querySelector("#seconds");
        updateClock();
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            days.innerHTML = addZero(getTimeRemaining(finalDate).days);
            hours.innerHTML = addZero(getTimeRemaining(finalDate).hours);
            minutes.innerHTML = addZero(getTimeRemaining(finalDate).min);
            seconds.innerHTML = addZero(getTimeRemaining(finalDate).sec);
        }
    }

    function addZero(n) {
        let number;
        if (n < 9) {
            number = `0${n}`;
        } else {
            number = n;
        }
        return number;
    }


    // Модальное окно

    const btnModal = document.querySelectorAll("[data-modal]");
    let modal = document.querySelector(".modal");
    let modalClose = document.querySelector(".modal__close");
    btnModal.forEach(btn => {
        btn.addEventListener("click", openModal);
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        // clearTimeout(SetTimeOut);
    }

    modalClose.addEventListener("click", () => {
        closeModal();
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape") {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            document.removeEventListener("scroll", showModalByScroll);
        }
    }


    // const SetTimeOut = setTimeout(openModal, 3000);
    document.addEventListener("scroll", showModalByScroll);


    // Работа с сервером

    let forms = document.querySelectorAll("form");
    forms.forEach(item => {
        postData(item);
    });


    let serverAnswer = {
        waiting: 'icons/spinner.svg',
        ok: "Спасибо, мы с вами свяжемся",
        faild: "Упс, что то пошло не так..."
    };

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let newImg = document.createElement("img");
            newImg.style.cssText = `
            display: block;
            margin: 0 auto;
            padding-top: 15px`;
            newImg.src = serverAnswer.waiting;
            form.append(newImg);
            form.insertAdjacentElement("afterend", newImg);

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            fetch("server.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
                // body: JSON.stringify(object)

            }).then(response => response.text())
                .then(data => {
                    console.log(data);
                    let prevModal = document.querySelector(".modal__dialog");
                    prevModal.style.display = "none";
                    let newModal = document.createElement("div");
                    newModal.classList.add("modal__dialog");
                    newModal.innerHTML = `
                <div class="modal__content">
                <form action="#">
                    <div class="modal__close">&times;</div>
                    <div class="modal__title">${serverAnswer.ok}</div>
                </form>
                </div>`;
                    document.querySelector(".modal").append(newModal);
                    document.querySelectorAll(".modal__close").forEach(close => {
                        close.addEventListener("click", () => {
                            closeModal();
                        });
                    });
                    setTimeout(() => {
                        newModal.remove();
                        form.reset();
                        prevModal.style.display = "block";
                        newImg.remove();
                    }, 2000);

                }).catch((data) => {
                    console.log(data);
                    let prevModal = document.querySelector(".modal__dialog");
                    prevModal.style.display = "none";
                    let newModal = document.createElement("div");
                    newModal.classList.add("modal__dialog");
                    newModal.innerHTML = `
                <div class="modal__content">
                <form action="#">
                    <div class="modal__close">&times;</div>
                    <div class="modal__title">${serverAnswer.faild}</div>
                </form>
                </div>`;
                    document.querySelector(".modal").append(newModal);
                    document.querySelectorAll(".modal__close").forEach(close => {
                        close.addEventListener("click", () => {
                            closeModal();
                        });
                    });
                });
        });
    }



});