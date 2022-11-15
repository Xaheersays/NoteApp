const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
addBtn.addEventListener(
    "click",
    function() {
        addNote()
    }
)
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
            (note) => {
                data.push(note.value)
            }
        )
        // console.log(data)
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}



const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
    <i class="copy fa-solid fa-copy"></i>
        <i class="italics fa-solid fa-italic"></i>
        <i class="underline fa-solid fa-underline"></i>
        <i class="bold fa-solid fa-bold"></i> 
         <i class="save fas fa-save"></i>
         <i class="trash fa-regular fa-trash-can"></i> 
    </div>
    <textarea id="text-box" >${text}</textarea>
    `;

    const  list = document.querySelector('.note');
    console.log(list);


    note.querySelector(".copy").addEventListener("click",function(){
        let  text = document.getElementById('text-box');
        
        text.select();
        document.execCommand('copy');
    });
    flag = true;

    note.querySelector(".bold").addEventListener("click",function(){
        if (flag) {
        document.getElementById("text-box").style.fontWeight = 'bold';
        flag = false;
        }
        else {
            document.getElementById("text-box").style.fontWeight = 'normal';
            flag=true;
        }

    });

    flagU = true;
    note.querySelector(".underline").addEventListener("click",function(){
        if (flagU) {
            document.getElementById("text-box").style.textDecoration = 'underline';

        flagU = false;
        }
        else {
            document.getElementById("text-box").style.textDecoration = 'none';

            flagU=true;
        }

    });

    flagI = true;
    note.querySelector(".italics").addEventListener("click",function(){
        if (flagI) {
            document.getElementById("text-box").style.fontStyle = 'Italic';
        flagI = false;
        }
        else {
            document.getElementById("text-box").style.fontStyle = 'normal';
            flagI=true;
        }

    });


    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes()
        }
    )
    main.appendChild(note);
    saveNotes()
}


(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()