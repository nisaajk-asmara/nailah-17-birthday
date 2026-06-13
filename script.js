import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
query,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDk43SW09ck3ZQve86Yf7_LefjnfWuMXKY",
  authDomain: "nailah-17-birthday.firebaseapp.com",
  projectId: "nailah-17-birthday",
  storageBucket: "nailah-17-birthday.firebasestorage.app",
  messagingSenderId: "865333701466",
  appId: "1:865333701466:web:997cd75e892b82b8066163"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// OPEN INVITATION

const openBtn = document.getElementById("openBtn");
const opening = document.getElementById("opening");
const mainInvitation = document.getElementById("mainInvitation");
const bgMusic = document.getElementById("bgMusic");

openBtn.addEventListener("click", () => {

    opening.style.display = "none";
    mainInvitation.style.display = "block";

    bgMusic.play().catch(() => {});

    const vinyl = document.getElementById("musicBtn");
    vinyl.classList.add("spinning");

});


// MUSIC PLAYER

const musicBtn = document.getElementById("musicBtn");

let isPlaying = true;

musicBtn.addEventListener("click", () => {

    if (bgMusic.paused) {

        bgMusic.play();

        musicBtn.classList.add("spinning");

        isPlaying = true;

    } else {

        bgMusic.pause();

        musicBtn.classList.remove("spinning");

        isPlaying = false;

    }

});


// FIREBASE RSVP

const form = document.getElementById("rsvpForm");

if(form){

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const guestName =
    document.getElementById("guestName").value.trim();

    const attendance =
    document.getElementById("attendance").value;

    if(!guestName){

        alert("Please enter your name");

        return;
    }

    try{

        await addDoc(
            collection(db, "rsvps"),
            {
                name: guestName,
                response: attendance,
                createdAt: Date.now()
            }
        );

        form.reset();

        alert("Thank you for your RSVP!");

    }

  catch(error){

    console.error(error);

    alert(error.message);

}

});

}


// DISPLAY RESPONSES

const responsesContainer =
document.getElementById("responses");

if(responsesContainer){

const q = query(
    collection(db, "rsvps")
);

onSnapshot(q, (snapshot) => {

    responsesContainer.innerHTML = "";

    const docs = [];

    snapshot.forEach((doc) => {

        docs.push(doc.data());

    });

    docs.sort((a,b)=>
        b.createdAt - a.createdAt
    );

    docs.forEach((data)=>{

        const card =
        document.createElement("div");

        card.classList.add("guest-card");

        card.innerHTML = `

        <h4>${data.name}</h4>

        <p>${data.response}</p>

        `;

        responsesContainer.appendChild(card);

    });

});

}


// SCROLL REVEAL

const observer =
new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

    if(entry.isIntersecting){

        entry.target.classList.add("show");

    }

});

});

document
.querySelectorAll("section")
.forEach(section=>{

observer.observe(section);

});


// SMOOTH ENTRANCE

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});