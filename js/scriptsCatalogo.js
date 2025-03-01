var carousel, carouselSlideWrapper, allSlides, activeElementIndex, firstElement, lastElement, rightButton, leftButton, slideActive, translateX, autoselectValue, manualSelectValue, manualMultipleSelectValue;

carousel = document.querySelector('.carousel');
carouselSlideWrapper = carousel.querySelector('.carousel__slide-wrapper');
rightButton = carousel.querySelector('.carousel__navigation--right');
leftButton = carousel.querySelector('.carousel__navigation--left');
slideActive = carousel.querySelector('.carousel__slide.active');
translateX = 0;
allSlides = carousel.querySelectorAll('.carousel__slide');
autoselectValue = carousel.dataset.autoselect;
manualSelectValue = carousel.dataset.manualSelect;
manualMultipleSelectValue = carousel.dataset.manualMultipleSelect;

function mobileDevices(){
    if (window.innerWidth <= 768){
        translateX = -100;
    }
}
mobileDevices();



//hacer coincidir active con selected

function autoselect(){
    if (autoselectValue == "true"){
        allSlides.forEach(function(element, index) {
            if (element.classList.contains('active')) {
                element.classList.add('selected');
            }
        })
    }
};

autoselect();



function recalcScena() {
    allSlides = carousel.querySelectorAll('.carousel__slide');
    allSlides.forEach(function(element, index) {
        if (element.classList.contains('active')) {
            activeElementIndex = index;
        }
        firstElement = allSlides[0];
        beforeLastElement = allSlides[allSlides.length - 2];
        lastElement = allSlides[allSlides.length - 1];
    });
}

recalcScena();
relocateSlides();
function relocateSlides() {
    /* mirar si la última pasa a la primera, la primera a la última, o nada...
    dependiendo de si la activa es la segunda o la penúltima */
    if (activeElementIndex === 1) {
        carouselSlideWrapper.insertBefore(lastElement, allSlides[0]);
    } else if (activeElementIndex === 0) {
        carouselSlideWrapper.insertBefore(lastElement, allSlides[0]);
        if (window.innerWidth >= 768) {
            carouselSlideWrapper.insertBefore(beforeLastElement, allSlides[0]);
            translateX = -100;
            moveSlides();
        }
    } else if (activeElementIndex >= (allSlides.length - 2)) {
        carouselSlideWrapper.appendChild(firstElement);
    }
}

//mover las diapositivas
function moveSlides(){
    for(var i = 0; i < allSlides.length; i++){
        allSlides[i].style.transform = "translateX(" + translateX + "%)";
    }
}

rightButton.addEventListener('click', function () {
    /* avanzar el carrusel */
    if (!!carousel.dataset.infinite) {
        slideActive.classList.remove('active');
        slideActive.nextElementSibling.classList.add('active');
        slideActive = slideActive.nextElementSibling;
        recalcScena();
        relocateSlides();
    }

    if (autoselectValue == "true"){
        allSlides.forEach.call(allSlides, function(elem) {
            if(elem !== this) {
                elem.classList.remove('selected');
            }
        })
        autoselect();
    }

    if (activeElementIndex < (allSlides.length - 2)) {
        translateX -= 100;
    }
    

    moveSlides();
});

leftButton.addEventListener('click', function () {
    /* retroceder el carrusel */
    if (!!carousel.dataset.infinite) {
        slideActive.classList.remove('active');
        slideActive.previousElementSibling.classList.add('active');
        slideActive = slideActive.previousElementSibling;
        recalcScena();
        relocateSlides();
    }


    if (autoselectValue == "true"){
        allSlides.forEach.call(allSlides, function(elem) {
            if(elem !== this) {
                elem.classList.remove('selected');
            }
        })
        autoselect();
    }


    if (activeElementIndex > 1) {
        translateX += 100;
    }
    

    moveSlides();
});




allSlides.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
        if (manualMultipleSelectValue == 'true') {
            e.currentTarget.classList.toggle('selected');
        } else if (manualSelectValue == 'true') {
            var selectedSlide = carousel.querySelector('.selected');
            if (!!selectedSlide && selectedSlide !== e.currentTarget) {
                selectedSlide.classList.remove('selected');
                e.currentTarget.classList.add('selected');
            } else {
                e.currentTarget.classList.toggle('selected');
                
            }
        }
    });
});