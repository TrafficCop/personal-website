document.addEventListener('DOMContentLoaded', function () {
				let anew = true;
				let horizontal = false;
				
				const ite = document.querySelector('.snaps-inline');
                const ele = document.querySelector('.main-scroller');
				let vert = document.querySelector('.back');
				const lst = document.querySelector('.last');
                ele.style.cursor = 'grab';
		
                let pos = { top: 0, left: 0, x: 0, y: 0 };
				
				function isInViewport(element) {
					const rect = element.getBoundingClientRect();
					return (
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.right <= (window.innerWidth || document.documentElement.clientWidth)*1.5
					);
				}
				
                const mouseDownHandler = function (e) {
			e.preventDefault();
					vert.style.cursor = 'grabbing';
                    ele.style.cursor = 'grabbing';
                    ele.style.userSelect = 'none';
					ite.style.scrollSnapType = 'none';
					ele.style.removeProperty('scroll-behavior');
					
                    pos = {
						topv: vert.scrollTop,
						x: vert.clientX,
						y: vert.clientY,
                        left: ele.scrollLeft,
                        top: ele.scrollTop,
                        // Get the current mouse position
                        x: e.clientX,
                        y: e.clientY,
                    };

                    document.addEventListener('pointermove', mouseMoveHandler);
                    document.addEventListener('pointerup', mouseUpHandler);
                };

                const mouseMoveHandler = function (e) {
			window.getSelection().removeAllRanges(); 
			e.target.setPointerCapture(e.pointerId)
                    let dx = e.clientX - pos.x;
                    let dy = e.clientY - pos.y;	
					const isMobile = navigator.userAgentData.mobile;
					let horiz = Math.abs(dx);
					if (!isMobile) {
						if (anew) {
							if (horiz > Math.abs(dy)) {
								horizontal = true;
							} else {
								horizontal = false;
							}
							anew = false;
						}
						if (horizontal) {
							dy = 0;
						} else {
							dx = 0;
						}
					}
                    // Scroll the element
                    ele.scrollTop = pos.top - dy;
					if (!(isInViewport(lst) && dx < 0)) {
						ele.scrollLeft = pos.left - dx;
					}
					if (isInViewport(vert)) {
						vert.scrollTop = pos.topv - dy;
					}
                };
				
                const mouseUpHandler = function () {
					anew = true;
					ele.style.scrollBehavior = 'smooth';
                    ele.style.cursor = 'grab';
                    ele.style.removeProperty('user-select');
					ite.style.scrollSnapType = 'x mandatory';
					ele.scrollBehavior = 'smooth';
					
					
                    document.removeEventListener('pointermove', mouseMoveHandler);
                    document.removeEventListener('pointerup', mouseUpHandler);
                };
				
                // Attach the handler
                ele.addEventListener('pointerdown', mouseDownHandler);
				

				const front = document.querySelector('#greet');
				let middle = document.querySelector('.middle');
				let back = document.querySelector('.main-scroller');
				back = back.lastElementChild;
				const first = document.querySelector('#first');
				const second = document.querySelector('#second');
				const third = document.querySelector('#third');
				let t = setInterval(()=> {if (isInViewport(front)) {
						first.classList.add("on");
					} else {
						first.classList.remove("on");
					}
					if (isInViewport(middle)) {
						vert = document.querySelector('.back');
						second.classList.add("on");
					} else {
						second.classList.remove("on");
					}
					if (isInViewport(back)) {
						third.classList.add("on");
						vert = document.querySelector('.last');
					} else {
						third.classList.remove("on");
					}
				}
				, 100);
				/*
				const canvas = document.querySelector('#backgd');
				const ctx = canvas.getContext('2d');

				const num_figs = 8;

				//we let xy = center for circle, top left if square
				class Shape {
					constructor(diameter, x, y, color) {
						this.diameter = diameter;
						this.x = x;
						this.y = y;
						ctx.strokeStyle = color;
						ctx.lineWidth = 1;
					}
					Circle(){
						let draw = new Path2D();
						draw.moveTo(this.x, this.y);
						draw.arc(this.x, this.y, this.diameter/2, 0, 2*Math.PI);
						ctx.stroke(draw);
					}
					Square() {
						let draw = new Path2D();
						draw.rect(this.x, this.y ,this.diameter, this.diameter);
					}
				}
				const c1 = new Shape(50, 100, 100, '#FFBB37');
				c1.Circle();*/
}
); 
