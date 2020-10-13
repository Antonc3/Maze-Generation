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

function generate(w,h,startX,startY,endX,endY){
	var walls = new Array();
	var maze = new Array(h*2+1);
	for(let i = 0; i < h*2+1;i++){
		maze[i] = new Array(w*2+1);
		for(let j = 0; j < w*2+1; j++){
			maze[i][j] = 'w'; 
		}
	}
	var [sX,sY] = [(startX-1)*2+1,(startY-1)*2+1]
	var adj = make_cell(maze,sX,sY,w,h);
	maze[sY][sX] = 'p';
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
				if((x+d-1)/2 == endX-1 && (y-1)/2==endY-1){
					maze[y][x+d] = 'f'
				}
			}
			else{
				adj =make_cell(maze,x,y+d)
				if((x-1)/2 == endX-1 && (y-1+d)/2==endY-1){
					maze[y+d][x] = 'f'
				}
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
		if(maze[y][x-1]!='w'){
			b++;
		}
		if(maze[y][x+1]!='w'){
			b--;
		}

		return b;
	}
	if(y%2==0){
		if(maze[y-1][x]!='w'){
			b++;
		}
		if(maze[y+1][x]!='w'){
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
		if(y<maze.length-2){
			adj.push(new Point(x,y+1));
		}
	}
	if(maze[y][x-1] == 'w'){
		if(x>1){
			adj.push(new Point(x-1,y));
		}
	}
	if(maze[y][x+1] == 'w'){
		if(x<(maze[0].length-2)){
			adj.push(new Point(x+1,y));
		}
	}
	return adj;
}

