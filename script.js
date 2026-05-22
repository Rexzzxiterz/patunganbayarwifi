const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(event) {

    preview.src = event.target.result;
    preview.style.display = "block";

    img.onload = () => {

      // memperbesar ukuran gambar 2x
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;

    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

function makeHD() {

  if (!img.src) {
    alert("Upload foto terlebih dahulu!");
    return;
  }

  // kualitas smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // gambar ke canvas dengan ukuran lebih besar
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // tampilkan hasil
  preview.src = canvas.toDataURL("image/png");

  alert("Foto berhasil di-HD-kan ✨");
}

function downloadImage() {

  if (!canvas.width) {
    alert("Buat HD terlebih dahulu!");
    return;
  }

  const link = document.createElement("a");

  link.download = "foto-hd.png";
  link.href = canvas.toDataURL("image/png");

  link.click();
}
