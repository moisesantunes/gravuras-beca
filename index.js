const express = require('express')
const app = express()
const uid =require('uid');
const port = 3000

var multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'site/gravuras/')
    },
    filename: function (req, file, cb) {
       cb(null, file.originalname);
    //    cb(null, req.body.ngrav);
    
    }
});

const upload = multer({ storage})
 
const fs = require('fs')
app.use(express.static('public'))

fs.watchFile('base.json', (curr, prev) => {
	let lis = JSON.parse(fs.readFileSync('base.json'))
console.log(lis.length)
  console.log(`the current mtime is: ${curr.mtime}`);
//  console.log(`the previous mtime was: ${prev.mtime}`);
});

app.get('/salvar-info/:chave?/:valor?',(req, res)=>{
	if(req.params.chave && req.params.valor){
	//	res.json(req.params)
	let l =JSON.parse(fs.readFileSync('base.json'))
	l.push(req.params)
	
		let obj =JSON.stringify(l)
	//	console.log(typeof obj)
		fs.writeFile('base.json',obj,(err)=>{
			if(err)console.log('deu ruim em escrever', err)
			res.send('salvo')
		})
	
	}else{
		res.send('tem nao mano')
	}
	
})

app.post('/salvar',upload.single('gravs'), (req, res) => {
	let l =JSON.parse(fs.readFileSync('site/bases/lista-imgs.json'))
	let obj= {
		'nomegrav':req.file.originalname,
		'refgrav':req.body.refgrav,
		'dgrav':req.body.sumido,
		'id':uid()
		}
//		console.log(obj)

	l.push(obj)
	console.log(l.length)
	let str =JSON.stringify(l)
		
	fs.writeFile('site/bases/lista-imgs.json',str,(err)=>{
		if(err)console.log('deu ruim em escrever', err)
		//res.send('salvo')
	//	res.redirect('/')	
	})
	res.redirect('/')
})

app.get('/lerjson', (req, res) => {
})



app.get('/', (req, res) => {
  res.send('Hello World!')
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
