import { NotebookIcon } from "lucide-react"
import { Link } from "react-router";

const NotesNotFound = ({ searchTerm, onClearSearch }) => {
  const hasSearch = Boolean(searchTerm?.trim());

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
        <div className="bg-primary/10 rounded-full p-8">
            <NotebookIcon className="size-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">{hasSearch ? 'No notes found' : 'No notes yet'}</h3>
        <p className="text-base-content/700">
          {hasSearch ? 'Try a different search term.' : 'Ready to organize your thoughts? Create your first note to get started on your journey.'}
        </p>
        {hasSearch ? (
          <button type="button" onClick={onClearSearch} className="btn btn-primary">
            Clear Search
          </button>
        ) : (
          <Link to="/create" className="btn btn-primary">
            Create Your First Note
          </Link>
        )}
    </div>
  )
}

export default NotesNotFound;