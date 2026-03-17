async function test() {
    try {
        // 1. Get a department
        console.log('Fetching departments...');
        const depts = await (await fetch('http://localhost:8000/master-data/departments')).json();
        if (!depts || depts.length === 0) {
            console.error('No departments found');
            return;
        }
        const deptId = depts[0].id;
        console.log('Using Department ID:', deptId);

        // 2. Create a Line
        console.log('Creating Line...');
        const resLine = await fetch('http://localhost:8000/master-data/lines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'TEST_LINE_' + Date.now(), departmentId: deptId })
        });
        const line = await resLine.json();
        console.log('Line Status:', resLine.status);
        console.log('Line Response:', line);

        if (!resLine.ok) return;

        // 3. Get a category
        console.log('Fetching categories...');
        const cats = await (await fetch('http://localhost:8000/master-data/categories')).json();
        if (!cats || cats.length === 0) {
            console.error('No categories found');
            return;
        }
        const catId = cats[0].id;
        console.log('Using Category ID:', catId);

        // 4. Create a Check Item
        console.log('Creating Check Item...');
        const resItem = await fetch('http://localhost:8000/master-data/check-items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                itemName: 'TEST_ITEM_' + Date.now(),
                checkDescription: 'Test Description',
                lineId: line.id,
                categoryId: catId
            })
        });
        const item = await resItem.json();
        console.log('Item Status:', resItem.status);
        console.log('Item Response:', item);

    } catch (e) {
        console.error('Fetch Error:', e);
    }
}

test();
