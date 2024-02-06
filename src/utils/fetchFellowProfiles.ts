const fetchFellowProfiles = async (block: string) => {
  const response = await fetch(`/api/getAllFellow?block=${block}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const responseData = await response.json();
  return _.get(responseData, 'data.profiles', []);
};

export default fetchFellowProfiles
