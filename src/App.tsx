import { useState } from "react";
import { Clipboard } from "lucide-react";

interface Idea {
  id: number;
  text: string;
  tags: string[];
}

const IdeaGrammer = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState("");
  const [newTag, setNewTag] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const handleAddIdea = () => {
    const newIdeaObject: Idea = {
      id: ideas.length + 1,
      text: newIdea,
      tags: [],
    };
    setIdeas([...ideas, newIdeaObject]);
    setNewIdea("");
  };

  const handleAddTag = (id: number) => {
    const ideaIndex = ideas.findIndex((idea) => idea.id === id);
    if (ideaIndex !== -1) {
      const updatedIdea = { ...ideas[ideaIndex] };
      updatedIdea.tags.push(newTag);
      setIdeas([
        ...ideas.slice(0, ideaIndex),
        updatedIdea,
        ...ideas.slice(ideaIndex + 1),
      ]);
      setNewTag("");
    }
  };

  const handleDeleteIdea = (id: number) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

  const handleDeleteTag = (id: number, tag: string) => {
    const ideaIndex = ideas.findIndex((idea) => idea.id === id);
    if (ideaIndex !== -1) {
      const updatedIdea = { ...ideas[ideaIndex] };
      updatedIdea.tags = updatedIdea.tags.filter((t) => t !== tag);
      setIdeas([
        ...ideas.slice(0, ideaIndex),
        updatedIdea,
        ...ideas.slice(ideaIndex + 1),
      ]);
    }
  };

  const handleGenerateText = () => {
    const text = ideas
      .map((idea) => {
        const tags = idea.tags.map((tag) => `#${tag}`).join(" ");
        return `${idea.text} ${tags}`;
      })
      .join("\n");
    setGeneratedText(text);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedText);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">IdeaGrammer</h1>
      <input
        type="text"
        value={newIdea}
        onChange={(e) => setNewIdea(e.target.value)}
        placeholder="Nueva idea"
        className="block w-full p-2 mb-2 border border-gray-400 rounded"
      />
      <button
        onClick={handleAddIdea}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Agregar idea
      </button>
      <ul>
        {ideas.map((idea) => (
          <li key={idea.id} className="mb-4">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Nueva etiqueta"
              className="block w-full p-2 mb-2 border border-gray-400 rounded"
            />
            <button
              onClick={() => handleAddTag(idea.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            >
              Agregar etiqueta
            </button>
            <p className="text-lg font-bold">{idea.text}</p>
            <ul>
              {idea.tags.map((tag) => (
                <li key={tag} className="mb-2">
                  <span className="text-lg">{tag}</span>
                  <button
                    onClick={() => handleDeleteTag(idea.id, tag)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDeleteIdea(idea.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar idea
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleGenerateText}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Generar texto
      </button>
      <textarea
        value={generatedText}
        rows={10}
        className="block w-full p-2 mb-2 border border-gray-400 rounded"
      />
      <button
        onClick={handleCopyText}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <Clipboard size={24} />
        Copiar texto
      </button>
    </div>
  );
};

export default IdeaGrammer;