const io = require("socket.io-client");

const postData = {
  type: "update",
  nik: "123456789",
  namaLengkap: "John Doe",
  jenisKelamin: "Male",
  tempatLahir: "City",
  tanggalLahir: "1990-01-01",
  agama: "Religion",
  statusKawin: "Single",
  jenisPekerjaan: "Engineer",
  namaProvinsi: "Province",
  namaKabupaten: "Kabupaten",
  namaKecamatan: "Kecamatan",
  namaKelurahan: "Kelurahan",
  alamat: "123 Main St",
  nomorRt: "01",
  nomorRw: "02",
  berlakuHingga: "2030-01-01",
  golonganDarah: "O",
  kewarganegaraan: "ID",
  foto: "link_to_photo",
  ttd: "signature_image",
  fingerAuth: "auth_data",
  index1: "index1_data",
  index2: "index2_data",
  tid: "",
};

const sendPostRequest = async () => {
  try {
    const response = await fetch("http://localhost:3000/new-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Send the request
sendPostRequest();

// Connect to the Socket.io server (adjust the URL if your server is running elsewhere)
const socket = io("http://localhost:3000");

// Listen for the 'connect' event to know when the client has successfully connected
socket.on("connect", () => {
  console.log("Connected to the server");
});

// Listen for 'welcomeData' event (if there is any existing data sent from the server)
socket.on("message", (data) => {
  console.log("Received initial data:", data);
});

// Listen for the 'newData' event, which will be triggered when new data is sent via the server's POST endpoint
socket.on("newData", (data) => {
  console.log("Received new data:", data);
});

// Listen for the 'disconnect' event to know when the client has disconnected
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
