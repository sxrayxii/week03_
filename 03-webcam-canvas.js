import { getContext } from "./week03-module.js";

document.addEventListener("DOMContentLoaded", function() {
	// เข้าถึง context ของ canvas
	// โดยใช้โมดูลที่สร้างขึ้น
	const ctx = getContext("#myCanvas"); // ใช้ ID ของ canvas ที่ต้องการเข้าถึง

	// เข้าถึงวิดีโอ
	const video = document.querySelector("#myVideo");
	// เมื่อวิดีโอโหลดข้อมูลแล้ว เราจะสามารถเข้าถึงขนาดของวิดีโอได้
	// ตัวอย่างนี้จะใช้เพื่อกำหนดขนาดของการวาดบนแคนวาสให้เป็นครึ่งหนึ่งของขนาดวิดีโอ
	let width, height;
	video.addEventListener("loadeddata", function() {
		// กำหนดขนาดของแคนวาสให้ตรงกับขนาดของวิดีโอ
		width = video.videoWidth / 2; // แบ่งครึ่งความกว้าง
		height = video.videoHeight / 2; // แบ่งครึ่งความสูง
	});
	// เมื่อวิดีโอเริ่มเล่น
	video.addEventListener("play", function() {
		// arrow function เพื่อให้สามารถใช้ requestAnimationFrame ได้
		// และวาดวิดีโอลงบนแคนวาส
		const draw = () => {
			// clearRect เพื่อเคลียร์แคนวาสก่อนวาดใหม่
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			// ตรวจสอบว่าวิดีโอยังเล่นอยู่หรือไม่
			if (!video.paused && !video.ended) {
				// วาดวิดีโอลงบนแคนวาส
				ctx.drawImage(video, 0, 0, width, height);

				// เขียนข้อความลงบนแคนวาส
				ctx.font = "30px Tahoma";
				ctx.fillStyle = "white";
				ctx.strokeStyle = "black";
				ctx.fillText("ส่วนนี้ canvas นะ!", 10, 40);
				ctx.strokeText("ส่วนนี้ canvas นะ!", 10, 40);

				// เรียกใช้ requestAnimationFrame เพื่อวาดเฟรมถัดไป
				requestAnimationFrame(draw);
			}
		};
		draw();
	});

	/* ############################## WebCam ############################## */

	// อ่านรายชื่อกล้องที่มีอยู่ แล้วแสดงใน select box
	// โดยใช้ navigator.mediaDevices.enumerateDevices()
	// จะได้รับรายการอุปกรณ์ที่มีอยู่ทั้งหมดเป็นรายการหรือ array
	// และกรองเฉพาะกล้อง (videoinput) เพื่อแสดงใน select box โดยใช้ deviceId เป็นค่า value ของ option
	navigator.mediaDevices.enumerateDevices()
	.then(devices => {
		devices.forEach(device => {
			// แสดงข้อมูลของอุปกรณ์ใน console
			console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
			const select = document.querySelector("#myCamDevices"); // เข้าถึง select box ที่มี ID เป็น cameraSelect
			if (device.kind === 'videoinput') {
				const option = document.createElement('option');
				option.value = device.deviceId; // ใช้ deviceId เป็นค่า value ของ option
				option.textContent = device.label || `Webcam ${idx + 1}`;
				select.appendChild(option);
			}
			// เพิ่ม event listener ให้กับ select box เพื่อให้สามารถเลือกกล้องได้
			select.addEventListener('change', userSelectedCamera);
		});
	})
	.catch(err => {
		console.error('ไม่สามารถเข้าถึงอุปกรณ์ได้:', err);
	});

	// ฟังก์ชันที่ใช้เมื่อผู้ใช้เลือกกล้องจาก select box
	function userSelectedCamera() {
		const selectedDeviceId = this.value; // รับค่า deviceId ที่ผู้ใช้เลือก
		console.log("กล้องที่เลือก:", selectedDeviceId);

		// ขออนุญาตเข้าถึงกล้องที่ผู้ใช้เลือก
		navigator.mediaDevices.getUserMedia({
			video: { deviceId: { exact: selectedDeviceId } }, // ใช้ deviceId ที่เลือก
			audio: false
		})
		.then(function(stream) {
			console.log("สตรีมจากกล้อง:", stream);
			video.srcObject = stream; // กำหนดแหล่งที่มาของวิดีโอเป็นสตรีมจากกล้อง
			video.play(); // เริ่มเล่นวิดีโอ
		})
		.catch(function(error) {
			console.error("เกิดข้อผิดพลาดในการเข้าถึงกล้อง:", error);
		});
	}
});