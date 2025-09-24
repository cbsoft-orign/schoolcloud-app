const Timetable = ({ timetables }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Timetable View</h3>
      {timetables.length === 0 ? (
        <p className="text-gray-600">No timetables available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {timetables.map((timetable) => (
            <div
              key={timetable.id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-sm font-medium text-gray-800">
                Subject: {timetable.subject}
              </p>
              <p className="text-sm text-gray-600">
                Day: {timetable.day_of_week}
              </p>
              <p className="text-sm text-gray-600">
                Time: {timetable.start_time} - {timetable.end_time}
              </p>
              <p className="text-sm text-gray-600">
                Class ID: {timetable.class_id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timetable;