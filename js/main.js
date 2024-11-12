

const app = Vue.createApp({
    data(){
        return{
            intro:'AppNote',
            notes: [],
            newNote: {
                title: '',
                content: '',
                id:null,                
                
            },
            error:null,
            editingNote: null, // Bruges til at holde styr på, hvilken note der redigeres
            noteIdToFetch: '', // Til at gemme brugerens input til Note ID
            foundNote: null,
        }
    }, 
    methods: {
        getAll(){
            axios.get('http://localhost:5221/api/notes')   
            .then(response=>{
                document.getElementById("content")
                this.notes=response.data;
            })
            .catch(
                error=>{
                    console.log(error)
                
            }
            )          
            
                           
        },
        getNoteById(noteId) {
            
            axios.get(`http://localhost:5221/api/notes/${noteId}`)
            .then(response => {
                // Hvis noten findes, vises den (f.eks. i en modal eller et separat område)
                this.foundNote = response.data;
                
            })
            .catch(error => {
                console.error(error);
                this.error = error.message;
                this.foundNote = null; // Ryd hvis der ikke findes en note
            });
        },
        opretNote() {
            axios.post('http://localhost:5221/api/notes', this.newNote)
            .then(response => {
                // Tilføj den nye note til listen
                this.notes.push(response.data);

                // Ryd formularen
                this.newNote.id = '';
                this.newNote.title = '';
                this.newNote.content = '';
            })
            .catch(error => {
                this.error = error.message;
            })               
            
            
        },

        

        deleteNote(noteId) {
            axios.delete(`http://localhost:5221/api/notes/${noteId}`)
            .then(() => {
                // Filtrér den slettede note ud af notes-listen
                this.notes = this.notes.filter(note => note.id !== noteId);
            })
            .catch(error => {
                this.error = error.message;
            });
            
        },

        
        
        clearForm(){
            // Ryd formularen efter opdatering
            this.newNote.id = '';
            this.newNote.title = '';
            this.newNote.content = '';
        },

    
    },
    
    
    
    computed:{
        myComputed(){
            return''
        },
    }


})