import type React from "react";
import { useState } from "react";

import './SearchBar.css';

interface SearchBarProps {
    onSubmit: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [term, setTerm] = useState<string>("");

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!term.trim()) return; // optional validation

        onSubmit(term);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={term}
                    onChange={handleChange}
                    placeholder="Search images..."
                />
            </form>
        </div>
    );
};

export default SearchBar;