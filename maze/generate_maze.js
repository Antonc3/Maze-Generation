const fs = require('fs');

const w = process.argv[2]
const h = process.argv[3]

const dst = process.argv[4];
const fd = fs.openSync(dst,'w')

class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	getX(){
		return this.x;
	}
	getY(){
		return this.y;
	}
}

var [startX,startY] = [1,1];
function generate(w,h){
	var walls = new Array();
	var maze = new Array(h*2+1);
	for(let i = 0; i < h*2+1;i++){
		maze[i] = new Array(w*2+1);
		for(let j = 0; j < w*2+1; j++){
			maze[i][j] = 'w';
		}
	}
	//remember to change to from i,j to x,y
	var adj = make_cell(maze,startX,startY);
	for(let i = 0; i < adj.length; i++){
		walls.push(adj[i]);
	}
	var len = walls.length;
	while(len > 0){
		let w = Math.floor(len*Math.random());
		let cur_wall = walls[w];
		let [x,y] = [cur_wall.getX(),cur_wall.getY()];
		let d = divides(maze,x,y);
		if(d!= 0){
			var adj;
			maze[y][x] = ' ';
			if(x%2 ==0){
				adj = make_cell(maze,x+d,y);
			}
			else{
				adj =make_cell(maze,x,y+d)
			}
			for(let i = 0; i < adj.length; i++){
				walls.push(adj[i]);
			}
		}
		walls.splice(w,1);

		len = walls.length;
	}
	return maze;
}

function divides(maze,x,y){
	let b = 0;
	if(x%2==0){
		if(maze[y][x-1]==' '){
			b++;
		}
		if(maze[y][x+1]==' '){
			b--;
		}
		return b;
	}
	if(y%2==0){
		if(maze[y-1][x]==' '){
			b++;
		}
		if(maze[y+1][x]==' '){
			b--;
		}
		return b;
	}
}
function make_cell(maze,x,y){
	maze[y][x] = ' ';
	let adj = new Array();
	if(maze[y-1][x] == 'w'){
		if(y>1){
			adj.push(new Point(x,y-1));
		}
	}
	if(maze[y+1][x] == 'w'){
		if(y<w*2-1){
			adj.push(new Point(x,y+1));
		}
	}
	if(maze[y][x-1] == 'w'){
		if(x>1){
			adj.push(new Point(x-1,y));
		}
	}
	if(maze[y][x+1] == 'w'){
		if(x<h*2-1){
			adj.push(new Point(x+1,y));
		}
	}
	return adj;
}

function save(maze){
	let str = ''
	for(let i = 0; i < maze.length-1;i++){
		for(let j = 0; j < maze[0].length; j++){
			str+=maze[i][j];
		}
		str+="\n";
	}
	for(let j = 0; j < maze[0].length; j++){
		str+=maze[maze.length-1][j];
	}
	return str;
}

var maze = generate(w,h);

let s = save(maze);
fs.writeSync(fd,s);