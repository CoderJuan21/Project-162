AFRAME .registerComponent("bullets",{
init:function(){
    this.shootBullet()
},
shootBullet:function(){
    window.addEventListener("keydown",(e)=>{
        if(e.key === "z"){
            var bullet = document.createElement("a-entity")
            bullet.setAttribute("geometry",{primitive:"sphere",radius:0.1})
            bullet.setAttribute("material","color","#bbfef9")

            var cam = document.querySelector("#camera")
            pos = cam.getAttribute("position")
            bullet.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
            var camera = document.querySelector("#camera").object3D
            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction)
            bullet.setAttribute("velocity",direction.multiplyScalar(-10))
            var scene = document.querySelector("#scene")
            scene.appendChild(bullet)
        }
    })
},
removeBullet:function(e){
   var element = e.detail.target.el
   var elementHit = e.detail.body.el
   if(elementHit.id.includes("box")){
       elementHit.setAttribute("material",{transparent:true,opacity:1})
       var impulse = new CANNON.Vector3(-2, 2, 1)
       var worldPoint = new CANNON.Vector3().copy(elementHit.getAttribute("position"))
       elementHit.body.applyImpulse(impulse,worldPoint)
       element.removeEventListener("collide",this.shoot)
       var scene = document.querySelector("#scene")
       scene.removeChild(element)
   }
}
})