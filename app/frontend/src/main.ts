fetch("/api/")
  .then((res) => {
    return res.json();
  })
  .then((payload) => {
    console.log(payload);
  });
