export function animScroll() {


    // Проверяем разрешение экрана
    function handleMediaQuery(event) {
        if (event.matches) {
            scrollPc()
        } else {
            scrollMob()
        }
    }

    // Создаем объект для медиазапроса на разрешение >= 750px
    const mediaQuery = window.matchMedia('(min-width: 750px)');

    // Добавляем обработчик для события изменения состояния медиазапроса
    mediaQuery.addEventListener('change', handleMediaQuery);

    // Вызываем обработчик для начальной проверки разрешения
    handleMediaQuery(mediaQuery);




    function scrollPc() {
        // animation scroll link
        const anchors = document.querySelectorAll('a[href*="#"]')
        for (let anchor of anchors) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()

                const blockID = anchor.getAttribute('href').substr(1)
                const blockElement = document.getElementById(blockID);

                // Получаем координаты элемента относительно окна просмотра
                const elementRect = blockElement.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;

                // Выполняем плавную прокрутку с смещением на 100 пикселей вверх
                window.scroll({
                    top: absoluteElementTop - 160,
                    behavior: 'smooth'
                });
            })
        }
    }

    function scrollMob() {
        // animation scroll link
        const anchors = document.querySelectorAll('a[href*="#"]')
        for (let anchor of anchors) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()

                const blockID = anchor.getAttribute('href').substr(1)
                const blockElement = document.getElementById(blockID);

                // Получаем координаты элемента относительно окна просмотра
                const elementRect = blockElement.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;

                // Выполняем плавную прокрутку с смещением на 100 пикселей вверх
                window.scroll({
                    top: absoluteElementTop - 120,
                    behavior: 'smooth'
                });
            })
        }
    }

}