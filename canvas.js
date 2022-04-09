const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d')

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;  
    mouse.y = event.y;
    
})

let maxRadius = 30
// let minRadius = 2

var colorArray = [
    '#3C308C',
    '#7569BF',
    '#A49CD9',
    '#1F1D59',
    '#F2F2F2'
];


window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
})

function Circle(x, y, velocidadex,velocidadey, radius){
    this.x = x;
    this.y = y
    this.velocidadex = velocidadex;
    this.velocidadey = velocidadey;
    this.radius = radius;
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2) 
        c.fillStyle = this.color
        c.fill()
    } 

    this.update = function(){
        if(this.x + this.radius> innerWidth || this.x - this.radius < 0 ){
            this.velocidadex = -this.velocidadex
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.velocidadey = -this.velocidadey
        }
    
            this.x += this.velocidadex
            this.y += this.velocidadey

        //Interação    
        if(mouse.x - this.x < 50 && mouse.x - this. x > -50 &&
           mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius) {
                this.radius += 1
            }

        } else if(this.radius > this.minRadius) {
            this.radius -= 1
        }

        
        

            this.draw();

    }
}

let circleArray = [];

function init(){
    circleArray = []

    for(let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 + 1
        let x = Math.random() * innerWidth
        let y = Math.random() * innerHeight
        let velocidadex = (Math.random() - 0.5) * 5
        let velocidadey = (Math.random() - 0.5) * 5
        circleArray.push(new Circle(x, y, velocidadex, velocidadey, radius));
    }
}



function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}



animate();
init();
