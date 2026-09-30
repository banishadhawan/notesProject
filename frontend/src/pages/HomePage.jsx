import Navbar from '../components/Navbar'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { SearchIcon, XIcon } from 'lucide-react';


const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const updateSearch = (value) => {
        setSearchTerm(value);
        setNotes([]);
        setLoading(true);
        setIsRateLimited(false);
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchNotes = async () => {
            try{
                const trimmedSearch = searchTerm.trim();
                const res = await api.get("/notes", {
                    params: trimmedSearch ? { search: trimmedSearch } : undefined,
                    signal: controller.signal,
                })
                console.log(res.data);
                setNotes(res.data)
                setIsRateLimited(false)
            }
            catch (error) {
                if (error.code === 'ERR_CANCELED') return;
                console.log("Error fetching notes")
                console.log(error);
                if(error.response?.status === 429){
                    setIsRateLimited(true)
                } else {
                    toast.error("Failed to load notes")
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        };

        const debounceTimer = setTimeout(fetchNotes, 200);
        return () => {
            clearTimeout(debounceTimer);
            controller.abort();
        };
    }, [searchTerm]);

  return (
    <div className='min-h-screen'>
        <Navbar />

        {isRateLimited && <RateLimitedUI />}

        <div className='max-w-7xl mx-auto p-4 mt-6'>
            <div className='relative mb-6 max-w-xl'>
                <SearchIcon className='absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/60' />
                <input
                    type='search'
                    value={searchTerm}
                    onChange={(event) => updateSearch(event.target.value)}
                    placeholder='Search notes...'
                    aria-label='Search notes'
                    className='input input-bordered w-full pl-10 pr-10'
                />
                {searchTerm && (
                    <button
                        type='button'
                        onClick={() => updateSearch('')}
                        aria-label='Clear search'
                        className='btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2'
                    >
                        <XIcon className='size-4' />
                    </button>
                )}
            </div>

            {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

            {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound searchTerm={searchTerm} onClearSearch={() => updateSearch('')} />}

            {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map((note) => (
                        <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    ))}
                </div>
            )}

        </div>
    </div>
  )
}

export default HomePage