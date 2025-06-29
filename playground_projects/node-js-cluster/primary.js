import cluster from "cluster";
import os from "os";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cpuCount = 4 ||os.cpus().length;

console.log(`Total Number of CPU's: ${cpuCount}`);
console.log(`Current Directory: ${__dirname}`);
console.log(`ProcessId inside primary.js: PID=${process.pid}`)

cluster.setupPrimary({
    exec: __dirname+'/index.js',
})

for(let i=cpuCount;i>0;i--)
{
    cluster.fork()
}

cluster.on("exit", (worker, code, signal)=>{
    console.log(`worker=[${worker.process.pid}] has been killed`)
    // console.log('Starting another one')
    console.log('DEBUG: ', code, signal)
    // cluster.fork()
})

//npx loadtest -n 1200 -c 400 -k http://localhost:3000/heavy