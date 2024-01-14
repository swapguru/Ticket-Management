import TicketCard from "./(components)/TicketCard";
import Link from "next/link";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Dashboard = async () => {
  const data = await getTickets();

  // Make sure we have tickets needed for production build.
  if (!data.tickets.length) {
    return [
      // eslint-disable-next-line react/jsx-key
      <h3 className="flex justify-center">No tickets</h3>,
      // eslint-disable-next-line react/jsx-key
      <Link className="flex justify-center" href="/TicketPage/new">
        <input type="submit" className="btn max-w-xs" value="Create Ticket" />
      </Link>,
    ];
  }

  const tickets = data.tickets;

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
