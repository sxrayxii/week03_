import { getContext } from "./week03-module.js";

document.addEventListener("DOMContentLoaded", function() {
	// เข้าถึง context ของ canvas
	// โดยใช้โมดูลที่สร้างขึ้น
	const ctx = getContext("#myCanvas"); // ใช้ ID ของ canvas ที่ต้องการเข้าถึง

	// overlay หมายถึงการวาดกราฟิกเพิ่มเติมบน canvas หรือจะเรียกว่าการวาดทับภาพที่มีอยู่แล้วก็ได้
	// ตัวอย่างการวาด overlay บน canvas

	// ข้อมูล overlay ตัวอย่าง ใช้เทคนิค object array (json)
	let overlayData = [
		{
			name: "Sample A",
			type: "rectangle",
			x: 50,
			y: 50,
			width: 200,
			height: 100,
			color: "rgba(255, 0, 0, 0.3)" // สีแดงโปร่งแสง
		},
		{
			name: "Sample B",
			type: "circle",
			x: 300,
			y: 100,
			radius: 50,
			color: "rgba(0, 0, 255, 0.3)" // สีน้ำเงินโปร่งแสง
		}
	];

	function draw() {
		// วาดพื้นหลังเป็นสีขาว
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// วาดรูปภาพจากแหล่งที่มาที่กำหนด
		const image = document.querySelector("#img-src");
		// นำรูปภาพมาแสดงบน canvas
		ctx.drawImage(image, 0, 0, image.width / 2, image.height / 2);

		// วาด overlay
		drawOverlay(overlayData);

		requestAnimationFrame(draw); // เรียกใช้ฟังก์ชัน draw ต่อไป
	}
	// เริ่มต้นการวาด
	draw();

	// ฟังก์ชันสำหรับวาด overlay บน canvas
	/**
	 * วาด overlay บน canvas
	 * @param {Array} data - ข้อมูลสำหรับวาด overlay
	 */
	function drawOverlay(data) {

		data.forEach(item => {
			ctx.fillStyle = item.color; // กำหนดสีสำหรับ overlay
			if (item.type === "rectangle") {
				// วาดสี่เหลี่ยม
				ctx.fillRect(item.x, item.y, item.width, item.height);
			} else if (item.type === "circle") {
				// วาดวงกลม
				ctx.beginPath();
				ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
				ctx.fill();
			}
			if (item.name) {
				// ถ้ามีชื่อ ให้แสดงชื่อบน overlay
				ctx.fillStyle = "white"; // กำหนดสีพื้นหลังสำหรับชื่อ
				ctx.font = "16px Tahoma"; // กำหนดฟอนต์สำหรับชื่อ
				ctx.fillText(item.name, item.x, item.y + 15);
			}
		});

	}

	// เพิ่ม overlay เมื่อมีการคลิกที่ button
	document.querySelector("#add").addEventListener("click", function() {
		// เพิ่ม overlay ใหม่
		overlayData.push({
			name: "New Overlay",
			type: "rectangle",
			x: Math.random() * ctx.canvas.width,
			y: Math.random() * ctx.canvas.height,
			width: 100,
			height: 50,
			color: "rgba(0, 255, 0, 0.3)" // สีเขียวโปร่งแสง
		});
	});

	// ลบ overlay เมื่อมีการคลิกที่ button
	document.querySelector("#rem").addEventListener("click", function() {
		// ล้าง overlay ทั้งหมด
		overlayData.pop();
	});
});