// function startAgain() {
//     // Add your code here to handle the click event
//     alert('Button clicked!'); // Example: showing an alert
// }
// document.addEventListener('DOMContentLoaded', function () {
//     const startButton = document.querySelector('.bat_dau');
//     const resetButton = document.querySelector('.choi-lai');
//     const circles = document.querySelectorAll('.den');
//     const carImages = document.querySelectorAll('.anhxe');
//     const finishLine = document.querySelector('.dich');

//     let gameStarted = false; // Biến để kiểm tra trạng thái bắt đầu của trò chơi
//     startButton.addEventListener('click', function () {
//         if (!gameStarted) {
//             resetGame();
//             gameStarted = true;
    
//             // Đèn đỏ hiển thị ngay lập tức
//             addCircleClass(circles[0], 'red');
    
//             setTimeout(function () {
//                 // Đèn vàng hiển thị sau 1000ms
//                 removeCircleClass(circles[0], 'red');
//                 addCircleClass(circles[1], 'yellow');
//             }, 1000);
    
//             setTimeout(function () {
//                 // Đèn xanh hiển thị sau 2000ms
//                 removeCircleClass(circles[1], 'yellow');
//                 addCircleClass(circles[2], 'green');
//                 moveCarRandomSpeed(carImages[0], finishLine.offsetLeft);
//                 moveCarRandomSpeed(carImages[1], finishLine.offsetLeft);
//             }, 2000);
//         }
//     });
    // startButton.addEventListener('click', function () {
    //     if (!gameStarted) {
    //         resetGame();

    //         // Bắt đầu trò chơi
    //         gameStarted = true;

    //         // Thêm lớp màu xanh cho hình tròn thứ 1
    //         addCircleClass(circles[0], 'red');

    //         // Đặt timeout để thêm lớp màu vàng cho hình tròn thứ 2 sau 3 giây
    //         setTimeout(function () {
    //             addCircleClass(circles[1], 'yellow');
    //         }, 1000);

    //         // Đặt timeout để thêm lớp màu đỏ cho hình tròn thứ 3 sau 6 giây
    //         setTimeout(function () {
    //             addCircleClass(circles[2], 'green');

    //             // Khi đèn xanh, cho các xe chạy với tốc độ ngẫu nhiên
    //             moveCarRandomSpeed(carImages[0], finishLine.offsetLeft);
    //             moveCarRandomSpeed(carImages[1], finishLine.offsetLeft);
    //         }, 2000);
    //     }
    // });

//     resetButton.addEventListener('click', function () {
//         resetGame();
//     });

//     // Hàm thêm lớp cho hình tròn
//     function addCircleClass(circle, className) {
//         circle.classList.add(className);
//     }

//     // Hàm loại bỏ lớp cho hình tròn
//     function removeCircleClass(circle, className) {
//         circle.classList.remove(className);
//     }

//     // Hàm thực hiện chuyển động cho hình ảnh xe về đích với tốc độ ngẫu nhiên
//     function moveCarRandomSpeed(car, finishLinePosition) {
//         const animationDuration = 4 + Math.random() * 6; // Tạo một thời gian ngẫu nhiên trong khoảng 4 đến 10 giây

//         car.style.animation = `moveCarAnimation ${animationDuration}s linear infinite`;
//         car.style.animationPlayState = 'running';

//         const keyframes = `@keyframes moveCarAnimation {
//             0% {
//                 transform: translateX(0);
//             }
//             100% {
//                 transform: translateX(${finishLinePosition - car.offsetLeft}px);
//             }
//         }`;

//         // Tạo một <style> element và thêm keyframes vào đó
//         const styleElement = document.createElement('style');
//         styleElement.innerHTML = keyframes;
//         document.head.appendChild(styleElement);
//     }

//     // Hàm đặt lại trạng thái trò chơi
//     function resetGame() {
//         gameStarted = false;
//         carImages.forEach(car => car.style.animation = 'none');
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.bat_dau');
    const resetButton = document.querySelector('.choi-lai');
    const circles = document.querySelectorAll('.den');
    const carImages = document.querySelectorAll('.anhxe');
    const finishLine = document.querySelector('.dich');

    let winningCar = null; // Biến để xác định xe chiến thắng
    let gameInProgress = false; // Biến để xác định trò chơi đang diễn ra hay không

    startButton.addEventListener('click', function () {
        if (!winningCar && !gameInProgress) {
            resetGame();
            gameInProgress = true;

            // Bắt đầu trò chơi
            addCircleClass(circles[0], 'red');

            setTimeout(function () {
                removeCircleClass(circles[0], 'red');
                addCircleClass(circles[1], 'yellow');
            }, 1000);

            setTimeout(function () {
                removeCircleClass(circles[1], 'yellow');
                addCircleClass(circles[2], 'green');
                moveCarRandomSpeed(carImages[0], finishLine.offsetLeft);
                moveCarRandomSpeed(carImages[1], finishLine.offsetLeft);
            }, 2000);
        }
    });

    resetButton.addEventListener('click', function () {
        if (!gameInProgress) {
            resetGame();
            winningCar = null; // Reset xe chiến thắng khi bắt đầu lại trò chơi
        }
    });

    function moveCarRandomSpeed(car, finishLinePosition) {
        const animationDuration = 4 + Math.random() * 6;

        car.style.animation = `moveCarAnimation ${animationDuration}s linear infinite`;
        car.style.animationPlayState = 'running';

        const keyframes = `@keyframes moveCarAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(${finishLinePosition - car.offsetLeft}px);
            }
        }`;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);

        car.addEventListener('animationiteration', function () {
            if (!winningCar) {
                winningCar = car;
                announceWinner();
            }
        });
    }

    function announceWinner() {
        if (winningCar) {
            const carNumber = winningCar.dataset.xe;
            alert(`Xe ${carNumber} chiến thắng!`);
            gameInProgress = false; // Dừng trò chơi khi có người chiến thắng
        }
    }

    function resetGame() {
        carImages.forEach(car => car.style.animation = 'none');
        gameInProgress = false; // Đặt lại trạng thái trò chơi khi bắt đầu lại
    }

    function addCircleClass(circle, className) {
        circle.classList.add(className);
    }

    function removeCircleClass(circle, className) {
        circle.classList.remove(className);
    }
});




