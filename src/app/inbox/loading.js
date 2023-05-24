export default function loading() {
  return (
    <div className="flex justify-start mt-[5rem]">
      <div className="flex flex-col justify-start pt-8 gap-8 mr-[15%] animate-pulse">
        <div className="h-6 bg-gray-400 rounded w-1/4"></div>
        <div className="h-6 bg-gray-400 rounded w-1/4"></div>
        <div className="h-6 bg-gray-400 rounded w-1/4"></div>
      </div>
      <div className="max-w-[60%] flex-1">
        <div className="flex flex-col gap-8">
          <div className="shadow-xl p-2 rounded-md border-8">
            <h3>City:</h3>
            <select>
              <option value="all">Всі</option>
              <option value="Київ">Київ</option>
              <option value="Миколаїв">Миколаїв</option>
              <option value="Одеса">Одеса</option>
            </select>
          </div>
          <div className="shadow-xl p-2 rounded-md border-8">
            <h3>Type:</h3>
            <select>
              <option value="all">Всі</option>
              <option value="В офісі">В офісі</option>
              <option value="Фріланс">Фріланс</option>
              <option value="Дистанційно">Дистанційно</option>
            </select>
          </div>
          <div className="shadow-xl p-2 rounded-md border-8">
            <h3>Search:</h3>
            <input type="text" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="mb-8 shadow-xl p-2 rounded-md border-8 w-[100%] "
            key={index}
          >
            <div className="h-6 bg-gray-400 rounded w-1/2"></div>
            <br />
            <div className="flex gap-4 text-sm">
              <div className="h-4 bg-gray-400 rounded w-1/4"></div>
              <div className="h-4 bg-gray-400 rounded w-1/4"></div>
              <div className="h-4 bg-gray-400 rounded w-1/4"></div>
            </div>
            <br />
            <div className="h-6 bg-gray-400 rounded w-3/4"></div>
            <br />
            <div className="flex gap-2">
              <div className="rounded-full h-10 w-10 bg-gray-400"></div>
              <br />
              <div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                <br />
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
