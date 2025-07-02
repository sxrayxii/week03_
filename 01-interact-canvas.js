import { getContext } from "./week03-module.js";

document.addEventListener("DOMContentLoaded", function() {
	// เข้าถึง context ของ canvas
	// โดยใช้โมดูลที่สร้างขึ้น
	const ctx = getContext("#myCanvas"); // ใช้ ID ของ canvas ที่ต้องการเข้าถึง

	// input ตัวอย่าง keyboard, mouse, touch
	let keys = {};
	document.addEventListener("keydown", function(event) {
		keys[event.key] = true; // บันทึกปุ่มที่กด
	});
	document.addEventListener("keyup", function(event) {
		keys[event.key] = false; // ลบปุ่มที่ปล่อย
	});

	let mouse = { x: 0, y: 0, isDown: false };
	document.addEventListener("mousemove", function(event) {
		mouse.x = event.offsetX; // ใช้ offsetX เพื่อให้ได้ตำแหน่งสัมพัทธ์กับ canvas
		mouse.y = event.offsetY; // ใช้ offsetY เพื่อให้ได้ตำแหน่งสัมพัทธ์กับ canvas
	});
	document.addEventListener("mousedown", function(event) {
		mouse.isDown = true; // ตั้งค่าว่าเมาส์กดอยู่
	});
	document.addEventListener("mouseup", function(event) {
		mouse.isDown = false; // ตั้งค่าว่าเมาส์ปล่อยแล้ว
	});

	let touch = { x: 0, y: 0, isDown: false };
	document.addEventListener("touchmove", function(event) {
		const touchEvent = event.touches[0]; // ใช้ touch แรก (นิ้วแรก)
		touch.x = touchEvent.pageX - ctx.canvas.offsetLeft; // คำนวณตำแหน่งสัมพัทธ์กับ canvas
		touch.y = touchEvent.pageY - ctx.canvas.offsetTop; // คำนวณตำแหน่งสัมพัทธ์กับ canvas
	});

	// วาดแคนวาส
	function draw() {
		// เคลียร์แคนวาสก่อนวาดใหม่
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// วาดข้อความแสดงสถานะของปุ่มที่กด
		ctx.font = "20px Tahoma";
		ctx.fillStyle = "black";
		ctx.fillText("Keys: " + Object.keys(keys).filter(key => keys[key]).join(", "), 10, 30);
		// Object.keys(keys) จะได้รายชื่อปุ่มทั้งหมดที่ถูกกด
		// filter จะกรองเฉพาะปุ่มที่มีค่าเป็น true (กดอยู่)
		// join จะรวมปุ่มที่กดเป็นสตริงเดียวกัน
		
		// วาดตำแหน่งของเมาส์
		ctx.fillText(`Mouse: (${mouse.x}, ${mouse.y})`, 10, 60);
		
		// วาดตำแหน่งของทัช
		ctx.fillText(`Touch: (${touch.x}, ${touch.y})`, 10, 90);

		// วาดวงกลมที่ตำแหน่งเมาส์
		if (mouse.isDown) {
			ctx.beginPath();
			ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
			ctx.fillStyle = "blue";
			ctx.fill();
			ctx.closePath();
		}

		requestAnimationFrame(draw); // เรียกใช้ draw ต่อไป
	}
	draw(); // เริ่มวาด
});