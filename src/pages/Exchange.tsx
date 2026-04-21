import { useEffect } from "react"
import { useBookStore } from "../store/bookStore";

export const Exchange = () => {
  const { books, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  if (!books) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-red-100">

      <div className="p-20">
        <div className="grid grid-cols-3 gap-5 w-full">  
          <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] h-25 rounded-2xl">
            <div className="flex flex-col h-full w-full p-6 text-white"> 
              <p className="text-2xl font-bold">4</p>
              <p className="text-xl"> Доступно для обмена</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#f093fb] to-[#f5576c]  h-25 rounded-2xl">
            <div className="flex flex-col h-full w-full p-6 text-white"> 
              <p className="text-2xl font-bold">3</p>
              <p className="text-xl">Всего обменов</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe]  h-25 rounded-2xl">
            <div className="flex flex-col h-full w-full p-6 text-white">
              <p className="text-2xl font-bold">6</p>
              <p className="text-xl">Друзей в сети</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 pt-5">
          {books.map((book) => (
              <div className="bg-white rounded-2xl flex flex-col gap-2 p-5">
                {/* БАСЫ */}
                <div className="flex flex-row gap-2">
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9uJTIwbm92ZWx8ZW58MXx8fHwxNzcxMjEyODA0fDA&ixlib=rb-4.1.0&q=80&w=400" 
      
                      alt=""
                      className="h-30 w-20 rounded-md" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>{book.title}</p>
                    <p></p>
                    <button>Доступно</button>
                    
                  </div>
                </div>
                
                {/* ОРТАСЫ */}
                <div className="bg-gray-100 flex flex-col p-2 rounded-2xl ">
                  <p>Поделились с:</p>
                  <p>Sarah Johnson, Emily Davis</p>
                </div>

                {/* СОҢЫ */}
                <div className="flex flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-green-500"
                    />
                    <span className="text-sm text-gray-700">Доступно</span>
                  </div>

                  <div>
                    <button className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-md p-3">Поделиться</button>
                  </div>

                </div>
              </div>
            )
          )}


        </div>  
      </div>  
    </div>
  )
}
