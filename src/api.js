
export const fetchTotalLaunches = async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/launches');
    const data = await response.json();
    return data.length;
  } catch (error) {
    console.error('Error fetching total launches:', error);
    return 0;
  }
};

export const fetchLaunches = async (limit, offset) => {
  try {
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching launches:', error);
    return [];
  }
};
