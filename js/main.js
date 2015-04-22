var cc = {
    config: {
        SUPPORTED_UNITS: ['px', '%'],
        UNIT_FORMAT: /^\d+(px|%)/g
    },
    city_wrapper: null,
    buildings: {},
    clouds: {},
    trees: {},
    bushes: {},
    buildingCreators: {
        b1: function(id, height, bgColor, windowColor, fromLeft) {

            var parsedHeight = window.parseInt(height);
            var buildingHeight = (parsedHeight % 2) ? parsedHeight + 1 : parsedHeight;

            var building = document.createElement('div');

            building.id = id;
            building.classList.add('building_1');
            building.style.left = fromLeft;
            building.style.backgroundColor = bgColor;
            building.style.height = buildingHeight;
            building.style.width = buildingHeight / 2;

            for (var i = 0; i < 6; i++) {
                var bw = document.createElement('div');
                bw.classList.add('b1_window');
                bw.style.backgroundColor = windowColor;
                building.appendChild(bw);
            }

            this.city_wrapper.appendChild(building);
        },
        b2: function(id, height, bgColor, windowColor, fromLeft) {

            var parsedHeight = window.parseInt(height);
            var buildingHeight = (parsedHeight % 2) ? parsedHeight + 1 : parsedHeight;

            var building = document.createElement('div');

            building.id = id;
            this.buildings[id] = building;
            building.classList.add('building_2');
            building.style.left = fromLeft;
            building.style.backgroundColor = bgColor;
            building.style.height = buildingHeight;
            building.style.width = buildingHeight / 2;

            for (var i = 0; i < 20; i++) {
                var bw = document.createElement('div');
                bw.classList.add('b2_window');
                bw.style.backgroundColor = windowColor;
                building.appendChild(bw);
            }

            this.city_wrapper.appendChild(building);
        },
        b3: function(id, height, bgColor, windowColor, fromLeft) {

            var parsedHeight = window.parseInt(height);
            var buildingHeight = (parsedHeight % 2) ? parsedHeight + 1 : parsedHeight;

            var building = document.createElement('div');
            var blockOne = document.createElement('div');
            var blockTwo = document.createElement('div');
            var blockThree = document.createElement('div');
            var blockFour = document.createElement('div');

            building.id = id;
            this.buildings[id] = building;
            building.classList.add('building_3');
            building.style.left = fromLeft;
            building.style.height = buildingHeight;
            building.style.width = buildingHeight / 4;


            blockOne.classList.add('b3_block_1');
            blockOne.style.backgroundColor = bgColor;

            blockTwo.classList.add('b3_block_2');
            blockTwo.style.backgroundColor = bgColor;
            for (var i = 0; i < 4; i++) {
                var bw = document.createElement('div');
                bw.classList.add('b3_bl2_window');
                bw.style.backgroundColor = windowColor;
                blockTwo.appendChild(bw);
            }

            blockThree.classList.add('b3_block_3');
            blockThree.style.backgroundColor = bgColor;
            for (var i = 0; i < 6; i++) {
                var bw = document.createElement('div');
                bw.classList.add('b3_bl3_window');
                bw.style.backgroundColor = windowColor;
                blockThree.appendChild(bw);
            }

            blockFour.classList.add('b3_block_4');
            blockFour.style.backgroundColor = bgColor;

            for (var i = 0; i < 12; i++) {
                var bw = document.createElement('div');
                bw.classList.add('b3_bl4_window');
                bw.style.backgroundColor = windowColor;
                blockFour.appendChild(bw);
            }

            building.appendChild(blockOne);
            building.appendChild(blockTwo);
            building.appendChild(blockThree);
            building.appendChild(blockFour);

            this.city_wrapper.appendChild(building);
        }
    },
    init: function() {
        this.city_wrapper = document.getElementById('city_wrapper');
    },
    createCity: function(width, height) {
        this.city_wrapper.style.width = width;
        this.city_wrapper.style.height = height;
    },
    createBuilding: function(id, height, bgColor, windowColor, fromLeft, type) {
        this.buildingCreators[type].call(this, id, height, bgColor, windowColor, fromLeft);
    },
    createCloud: function(id, width, top, left) {

        if (this.validateId(id, this.clouds)) {
            var cloudWidth = this.parseInput(width);
            var unit = this.getInputUnit(width);

            var cloud = document.createElement('div');
            var cloudBubbleOne = document.createElement('div');
            var cloudBubbleTwo = document.createElement('div');
            var cloudRectangle = document.createElement('div');

            cloud.id = id;
            this.clouds[id] = cloud;
            cloud.classList.add('cloud');
            cloud.style.width = cloudWidth + unit;
            cloud.style.height = (cloudWidth / 2) + unit;
            cloud.style.top = top ? top : 0;
            cloud.style.left = left ? left : 0;


            cloudBubbleOne.classList.add('cloud_bubble_one');
            cloudBubbleTwo.classList.add('cloud_bubble_two');
            cloudRectangle.classList.add('cloud_rectangle');
            
            cloud.appendChild(cloudBubbleOne);
            cloud.appendChild(cloudBubbleTwo);
            cloud.appendChild(cloudRectangle);

            this.city_wrapper.appendChild(cloud);
        }
    },
    createTree: function(id, height, top, left, type) {

        var parsedHeight = window.parseInt(height);
        var treeHeight = (parsedHeight % 2) ? parsedHeight + 1 : parsedHeight;

        var tree = document.createElement('div');
        var trunk = document.createElement('div');
        var treeBubbleOne = document.createElement('div');
        var treeBubbleTwo = document.createElement('div');

        tree.id = id;
        this.trees[id] = tree;
        tree.classList.add('bubble_tree');
        tree.style.height = treeHeight + 'px';
        tree.style.width = (treeHeight / 2) + 'px';
        tree.style.top = top ? top : 0;
        tree.style.left = left ? left : 0;

        trunk.classList.add('bt_trunk');
        treeBubbleOne.classList.add('bt_bubble_one');
        treeBubbleTwo.classList.add('bt_bubble_two');

        tree.appendChild(trunk);
        tree.appendChild(treeBubbleOne);
        tree.appendChild(treeBubbleTwo);

        if (type === "bubble_tree_two") {
            var treeBubbleThree = document.createElement('div');
            treeBubbleThree.classList.add('bt_bubble_three');
            tree.insertBefore(treeBubbleThree, tree.firstChild);
        }

        this.city_wrapper.appendChild(tree);
    },
    createBush: function(id, width, top, left) {
        var parsedWidth = window.parseInt(width);
        var bushWidth = (parsedWidth % 2) ? parsedWidth + 1 : parsedWidth;

        var bush = document.createElement('div');
        var bubbleOne = document.createElement('div');
        var bubbleTwo = document.createElement('div');
        var bubbleThree = document.createElement('div');

        bush.id = id;
        this.bushes[id] = bush;
        bush.style.width = bushWidth + 'px';
        bush.style.height = (bushWidth / 2) + 'px';

        bush.classList.add('bush');
        bubbleOne.classList.add('bush_bubble_one');
        bubbleTwo.classList.add('bush_bubble_two');
        bubbleThree.classList.add('bush_bubble_three');

        bush.appendChild(bubbleOne);
        bush.appendChild(bubbleTwo);
        bush.appendChild(bubbleThree);

        this.city_wrapper.appendChild(bush);
    },
    validateId: function(id, object) {
        /* Checks to see whether any component is already created with the same id */
        if (object && object[id]) {
            console.error('The id ' + id + ' is already registered');
            return false;
        }
        return true;
    },
    inputMatchesFormat: function(input, format) {
        /* Checks whether the input parameter provided matches the provided format */

        return (input && format && input.match(format)) ? true : false;
    },
    parseInput: function(input) {
        /* Get the integer value from an input of the format XX% or XXpx and converts it into an even number */

        if (this.inputMatchesFormat(input, this.config.UNIT_FORMAT)) {
            var parsedInput = window.parseInt(input);
            var finalInput = (finalInput % 2) ? parsedInput + 1 : parsedInput;
            return finalInput;
        } else {
            throw "Given width/height " + input + " is not of a valid format";
        }

    },
    getInputUnit: function(input) {
        var unit;

        if (this.inputMatchesFormat(input, this.config.UNIT_FORMAT)) {
            for (var i = 0; i < this.config.SUPPORTED_UNITS.length; i++) {
                if (input.indexOf(this.config.SUPPORTED_UNITS[i]) != -1) {
                    unit = this.config.SUPPORTED_UNITS[i];
                    break;
                }
            }
            return unit;
        } else {
            throw "Given width/height " + input + " is not of a valid format";
        }
    }
};

cc.init();
cc.createCity('100%', '100%');
cc.createBuilding("building_one", '100px', "royalblue", "white", '200px', 'b1');
cc.createBuilding("building_two", '200px', "darkgreen", "yellow", '300px', 'b2');
cc.createBuilding("building_two", '400px', "black", "white", '100px', 'b3');
cc.createCloud('cloud_three', '200px', '20px', '30px');
cc.createCloud('cloud_one]', '20%', '20%', '30%');
cc.createTree('tree_one', '100px', 'one', '300px', '300px');
cc.createTree('tree_three', '40%', '10px', '50px', 'bubble_tree_two');
cc.createBush('bush_one', '100px', '200px', '300px');