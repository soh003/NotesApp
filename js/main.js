

const app = Vue.createApp({
    data(){
        return{
            intro:'AppNote',
            notes: [],
            newNote: {
                Title: '',
                Content: '',
                id:null,
                
                
            },
            error:null,
            editingNote: null // Bruges til at holde styr på, hvilken note der redigeres
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

        editNote(note) {
            this.editingNote = { ...note }; // Opret en kopi af noten til redigering
        },

        updateNote(){
            if (this.editingNote) {
                axios.put(`http://localhost:5221/api/notes/${this.editingNote.id}`, this.editingNote)
                    .then(response => {
                        // Find indekset for den opdaterede note
                        const index = this.notes.findIndex(note => note.id === this.editingNote.id);
                        if (index !== -1) {
                            this.notes[index] = response.data; // Opdater noten i arrayet
                        }
                        this.editingNote=null; // Afslut redigeringstilstand
                    })
                    .catch(error => {
                        this.error = error.message;
                    });
                }
        },
        cancelEdit(){
            this.editingNote=null; //Annuller redigering
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