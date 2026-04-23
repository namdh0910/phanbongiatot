const apiKey = "AIzaSyAw5ifexM6H7StiZvdDZCgRzMgNli2okzo";

async function listAll() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const flashModels = data.models.filter(m => m.name.includes("flash"));
  console.log("Flash Models:");
  flashModels.forEach(m => console.log(m.name));
  
  const proModels = data.models.filter(m => m.name.includes("pro"));
  console.log("\nPro Models:");
  proModels.forEach(m => console.log(m.name));
}

listAll();
