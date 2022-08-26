import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreSelectedProps {
  children: ReactNode
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreSelectedData {
  selectedGenreId: number,
  handleClickButton: (value: number) => void,
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
}

export const GenreContext = createContext<GenreSelectedData>(
  {} as GenreSelectedData
)
export function GenreSelectedProvider({children}: GenreSelectedProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenreContext.Provider value={{selectedGenreId, handleClickButton, selectedGenre}}>
      {children}
    </GenreContext.Provider>
  )
}