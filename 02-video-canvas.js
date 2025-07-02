import { getContext } from "./week03-module.js";

document.addEventListener("DOMContentLoaded", function() {
	// เข้าถึง context ของ canvas
	// โดยใช้โมดูลที่สร้างขึ้น
	const ctx = getContext("#myCanvas");

	// เข้าถึงวิดีโอและเริ่มวาดลงบนแคนวาส
	// เมื่อวิดีโอเริ่มเล่น
	const video = document.querySelector("#myVideo");
	video.src = "./v2.mp4"; // กำหนดแหล่งที่มาของวิดีโอ
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
});