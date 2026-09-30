import Note from '../models/Note.js'

export async function getAllNotes (req, res) {
    try{
        const notes = await Note.find({ user: req.user._id }).sort({createdAt: -1}); // newset first
        res.status(200).json(notes);
    } catch(error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Error fetching notes"});
    }
};

export async function getNoteById (req, res) {
    try{
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if(!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);
    }
    catch(error) {
        console.error("Error fetching note:", error);
        res.status(500).json({message: "Error fetching note"});
    }
};

export async function createNotes (req, res) {
    try{
        const { title, content } = req.body
        const note = new Note({ title, content, user: req.user._id })

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } 
    catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({message: "Error creating note"});
    }
};

export async function updateNotes (req, res) {
    try{
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content },
            { new: true }
        );

        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json(updatedNote);
    } 
    catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({message: "Error updating note"});
    }
};

export async function deleteNotes (req, res) {
    try{
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note deleted successfully"});
    }
    catch(error) {
        console.error("Error deleting note:", error);
        res.status(500).json({message: "Error deleting note"});
    }
}



