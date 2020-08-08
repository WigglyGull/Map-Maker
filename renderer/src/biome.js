const activeClass = "activeBiome";

exports.createBiome = biomes => {
    if(biomes === null){
        console.error("Biomes not found");
        return;
    }

    biomes.forEach(biome => {
        biome.addEventListener("click", ()=>{
            if(biome.classList.contains(activeClass)) return;
            else{
                biome.classList.add(activeClass);
                setActive(biome, biomes);
            }
        });
    });
}

function setActive(currentBiome, biomes){
    biomes.forEach(biome => {
        if(biome === currentBiome) return;
        biome.classList.remove(activeClass);
    });
}