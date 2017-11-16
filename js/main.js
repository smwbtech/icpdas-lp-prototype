window.onload = function(){
    var sliderImgFirstChild = document.querySelector('.slider-images img:first-child'),
        sliderImgLastChild = document.querySelector('.slider-images img:last-child'),
        circlesNode = document.querySelectorAll('div[class*="circle"]'),
        sliderContainer = document.querySelector('.slider-container'),
        sliderTextBlock = document.querySelector('.slider-text'),
        animationContainer = document.querySelector('.animation-container'),
        block2 = document.getElementById('block-2'),
        block3 = document.getElementById('block-3'),
        controllPoints = [getYCords(block2)-500, getYCords(block3)-500],
        animations = [false, false],
        triggerMenu = document.querySelector('.trigger'),
        navigation = document.querySelector('nav ul'),
        navigationLinks = navigation.querySelectorAll('a'),
        sliderOne  = {
            texts: ['Используемые в качестве аппаратной платформы модульные контроллеры ICP DAS позволяют подключить практически любое конечное оборудование автоматизации и наладить взаимодействие с ним.',
           'В среде разработки MasterSCADA 4D можно легко и просто произвести всю настройку опроса подключенных датчиков и устройств и запрограммировать логику взаимодействия между вводными параметрами и управляющими сигналами используя текстовые и графические языки стандарта МЭК 61131-3.',
           'Возможность гибкой настройки ведения архивов в локальной памяти контроллера и передачи данных на сервера архивирования',
            'Исполнительная среда MasterSCADA 4D позволяет развернуть Веб-сервер визуализации параметров прямо внутри контроллера, с помощью которого операторы могут открыть мнемосхему АСУ ТП с любого современного браузера на компьютере, телефоне или планшете.',
            'Система TANK-870-Q170 от IEI оснащена максимально удобным встроенным 4-контактным источником питания, предназначенным для питания дополнительных плат расширения. Благодаря этому изделие обретает дополнительную гибкость, что крайне важно для устройств, функционирующих в промышленных условиях.'],
            headers: ['Подключение устройств нижнего уровня', 'Графическое и тесктовое программирование', 'Архивирование данных', 'Веб-сервер визуализации HTML5', 'Контроллер, как часть распределенной системы'],
            buttons: (function(){
                return document.querySelectorAll('a[class*="slide-"]');
            })(),
            activeButton: (function(){
                return document.querySelector('#slider a.active');           
           })(),
            slideIndex: (function(){
                var x,
                    buttons = document.querySelectorAll('a[class*="slide-"]');;
                for(var i = 0; i < buttons.length; i++){
                    if(buttons[i].classList.contains('active')){
                        x = i;
                    }
                }
                return x;
            })(),
            text: (function(){
                return document.querySelector('.slider-text');
            })(),
            textField: (function(){
                return document.querySelector('.slider-text p');
            })(),
            headerField: (function(){
                return document.querySelector('.slider-text h2');
            })(),
            sliderImage:(function(){
                return document.querySelector('.slider-images img:last-child');
            })(),
            sliderAutomationStatus: true,
            sliderAutomationId: 0
        },
        sliderTwo = {
            texts: ['В данном проекте отображена работа приточно-вытяжной установки. Возможно просмотреть температуру обратной воды, уличного воздуха и, конечно, температуру в канале. Также отображается работа калориферов и залонок, рекуператора и вентилятора.',
           'Проект отображает работу водозаборного узла. Управление скважинным забором может быть как ручным, так и автоматическим, а само давление можно менять в определенных пределах. Кроме того, возможно имитировать аварии: поломку насоса и пробой трубопровода. ',
           'Возможно выставить автоматический или ручной режим работы станции. Также квитировать аварийные ситуации, просмотреть ретроспективные значения параметров с помощью трендов. Кроме того, возможно произвести диагностику оборудования. ',
           'Проект дает представление о работе канализационной станции в состав которой входят: бак хранения, трубопроводы и насосное оборудование. Газоанализаторы можно настраивать в соответствии с необходимым заданием. Проект позволяет имитировать аварию основного или резервного источника питания, осуществить короткое замыкание или создать неполадку одного из насосов',
            'В проекте автоматизации "умного" дома реализовано управление климатической установкой в жилых помещениях и гараже. Также возможно управлять светом и звуком. Применена функция открытия окон и гаражных ворот. Для комфортного отдыха в доме сделали доступ к удаленной настройке мультимедийной системы.'],
            headers: ['Вентиляционные системы', 'Водозаборный узел', 'Водонасосная станция', 'Канализационная насосная станция', 'Загородный дом'],
            buttons: (function(){
                return document.querySelectorAll('[class*="app-"]');
            })(),
            activeButton: (function(){
                return document.querySelector('#block-5 a.active');           
           })(),
            slideIndex: (function(){
                var x,
                    buttons = document.querySelectorAll('[class*="app-"]');
                for(var i = 0; i < buttons.length; i++){
                    if(buttons[i].classList.contains('active')){
                        x = i;
                    }
                }
                return x;
            })(),
            text: (function(){
                return document.querySelector('.application');
            })(),
            textField: (function(){
                return document.querySelector('.application p ');
            })(),
            headerField: (function(){
                return document.querySelector('.application h3');
            })(),
            sliderImage:(function(){
                return document.querySelectorAll('div[class*="block-5-img"]');
            })(),
            sliderAutomationStatus: true,
            sliderAutomationId: 0,
            sliderId: 2
        };
    
    
    function sliderAutomation(comand, sliderObj){
        var intervalStarter = function(func, time){
            var intervalId = setInterval(func, time);
            sliderObj.sliderAutomationId = intervalId;
        },
            time = 0;
        sliderObj.sliderId === 2? time = 10000 : time = 3000;
        if(comand === true){
            sliderObj.sliderAutomationStatus = comand;
            intervalStarter(function(){
                if(sliderObj.slideIndex === sliderObj.buttons.length-1){
                    buttonChange(sliderObj.slideIndex, sliderObj);
                    sliderObj.slideIndex = 0;
                    buttonChange(sliderObj.slideIndex, sliderObj);
                    contentChange(sliderObj.slideIndex, sliderObj);
                }
                else{
                buttonChange(sliderObj.slideIndex, sliderObj);
                sliderObj.slideIndex = sliderObj.slideIndex + 1;
                buttonChange(sliderObj.slideIndex, sliderObj);
                contentChange(sliderObj.slideIndex, sliderObj);
                }
            }, time);
        }
        else{
            sliderObj.sliderAutomationStatus = comand;
            clearInterval(sliderObj.sliderAutomationId);
        }
        
    }
    
    sliderAutomation(true, sliderOne);
    sliderAutomation(true, sliderTwo);
    
    function buttonChange(index, sliderObj){
        if(sliderObj.buttons[index].classList.contains('active')){
            sliderObj.buttons[index].classList.remove('active');
            sliderObj.buttons[index].classList.add('inactive');
        }
        else{
            sliderObj.buttons[index].classList.remove('inactive');
            sliderObj.buttons[index].classList.add('active');
            sliderObj.activeButton = index;
        }
    }
    
    function contentChange(index, sliderObj){
        if(sliderObj.text.classList.contains('show-slide') && sliderObj.sliderId !== 2){
            sliderObj.text.classList.remove('show-slide');
            sliderObj.sliderImage.classList.remove('show-slide');
            sliderObj.text.classList.add('hide-slide');
            sliderObj.sliderImage.classList.add('hide-slide');
            setTimeout(function(){
                        sliderObj.text.classList.remove('hide-slide');
                        sliderObj.sliderImage.classList.remove('hide-slide');
                        sliderObj.text.classList.add('show-slide');
                        sliderObj.sliderImage.classList.add('show-slide');
                        sliderObj.textField.innerHTML = sliderObj.texts[index];
                sliderObj.headerField.innerHTML = sliderObj.headers[index];
                sliderObj.sliderImage.src = 'img/slider-feature-'+(index+1)+'.png'
                    }, 500);
        }
        else if(sliderObj.text.classList.contains('show-slide-1') && sliderObj.sliderId === 2){
            var sliderImages = document.querySelectorAll('div[class*="block-5-img"]'),
                ind = (function(){ return index === 4? 0 : index + 1; })();
            sliderObj.text.classList.remove('show-slide-1');
            sliderImages[1].classList.remove('show-slide-1');
            sliderObj.text.classList.add('hide-slide-1');
            sliderImages[1].classList.add('hide-slide-1');
            setTimeout(function(){
                sliderObj.text.classList.remove('hide-slide-1');
                sliderObj.text.classList.add('show-slide-1');
                sliderImages[1].classList.remove('hide-slide-1');
                sliderImages[1].style.background = '#ccc url(img/block5-background-' +ind+ '.jpg)';
                sliderImages[0].style.background = '#ccc url(img/block5-background-' +(ind === 0? 4 : ind - 1)+ '.jpg)';
                sliderImages[1].parentElement.insertBefore(sliderImages[1], sliderImages[0]);
                sliderObj.textField.innerHTML = sliderObj.texts[index];
                sliderObj.headerField.innerHTML = sliderObj.headers[index];
            }, 500);
            
        }
    }
    
    function handleSlider(eventObj){
        var sliderObj;
        eventObj.target.classList.contains('controll')? sliderObj = sliderTwo : sliderObj = sliderOne ;
        if(eventObj.target.classList.contains('inactive')){
            buttonChange(sliderObj.slideIndex, sliderObj);
            sliderObj.slideIndex = (function(){
                if(sliderObj.sliderId !== 2){
                    return (eventObj.target.classList[0][eventObj.target.classList[0].length-1])*1-1;
                }
                else{
                    return (eventObj.target.classList[1][eventObj.target.classList[1].length-1])*1-1;
                }
            })();
            sliderObj.activeButton = sliderObj.slideIndex;
            sliderAutomation(false, sliderObj);
            setTimeout(function(){
                if(!sliderObj.sliderAutomationStatus)
                sliderAutomation(true, sliderObj);
            },8000);
            buttonChange(sliderObj.slideIndex, sliderObj);
            contentChange(sliderObj.slideIndex, sliderObj);
        }
        return false;
    }
    
    
    for(var i = 0; i < sliderOne.buttons.length; i++){
        sliderOne.buttons[i].onclick = handleSlider;
    }
    for(var i = 0; i < sliderTwo.buttons.length; i++){
        sliderTwo.buttons[i].onclick = handleSlider;
    }
    for(var i = 0; i < navigationLinks.length; i++){
        navigationLinks[i].onclick = smoothScroll;
    }
    
    
    
    triggerMenu.onclick = function(){
        if(navigation.classList.contains('active-menu')){
            navigation.classList.remove('active-menu');
        }
        else{
            navigation.classList.add('active-menu');
        }
        return false;
    }
    
    window.onscroll = function(){
        var scroll = pageYOffset;
        if(scroll >= controllPoints[0] && scroll < controllPoints[1] && !(animations[0])){
            appear(block2.children[1].children);
            animations[0] = true;
        }
        else if(scroll >=controllPoints[1] && !(animations[1])){
            appear(block3.children[1].children);
            animations[1] = true;
        }
    };
    displayElement(animationContainer);
    if(document.documentElement.clientWidth < 1024){
        adoptCoords(sliderImgFirstChild, sliderImgLastChild, circlesNode,  sliderContainer, sliderTextBlock);
    }
    
    
}

function adoptCoords(img1, img2, circles, slContainer, slTextBlock){
    var topCoords = img1.clientHeight + 60;
    img2.style.top = topCoords +'px'; 
    for(var i = 0; i < circles.length; i++){
        circles[i].style.top = (topCoords/2 + 20 * i) + 'px';
    }
    slContainer.style.minHeight = (img1.clientHeight + img2.clientHeight + slTextBlock.clientHeight + 250) + 'px';
}

function displayElement(elem){
    elem.classList.add('display');
}

function getYCords(elem){
    var box = elem.getBoundingClientRect();
    return box.top + pageYOffset;
}

function appear(block){
    var i = 0,
        intervalId = setInterval(function(){
            block[i].classList.add('appear');
            i++;
        }, 100*block.length);
    
    setTimeout(function(){
        clearInterval(intervalId);
    }, (110*block.length)*block.length);  
    
}

function smoothScroll(eventObj){
    var index = eventObj.target.href.slice(eventObj.target.href.indexOf('#')+1),
        element = document.getElementById(index),
        elementYCords = getYCords(element),
        intervalId = (function(){
            var id = setInterval(function(){
                if(pageYOffset < elementYCords){
                scrollTo(0, pageYOffset+30);}
                else{
                    clearInterval(id);
                }
            }, 10);
        })();
    console.log(elementYCords);
    return false;
}











