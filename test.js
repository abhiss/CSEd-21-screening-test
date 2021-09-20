//@ts-check

const log = console.log;
const query = (string) => document.querySelector(string);
const queryAll = (string) => document.querySelectorAll(string);
let delay = time => new Promise(r => setTimeout(r, time));

/**
 * @param {boolean} expression 
 */
function assert(expression) {
    if (expression)
        return;
    else throw `Expression false.`;
}

/**
 * @param {string} statement 
 * @param {Function} callback 
 * @param {boolean} should_throw
 */
async function test(statement, callback, repeat = 1, should_throw = false) {
    for (let i = 0; i < repeat; i++) {
        let did_throw = false;
        let err = '';
        try {
            await delay(500);
            await callback();
        }
        catch (er) {
            did_throw = true;
            err = er;
        }
        if (err) {
            log((did_throw == should_throw) ? '✔️' : '❌', statement, '\nErr: ', err);
        } else {
            log((did_throw == should_throw) ? '✔️' : '❌', statement);
        }

    }
}

async function TestRunner() {    
    await test("add row button adds another row", async function () {
        const init_count = query('tbody').childElementCount;
        query('#add-row-btn').click();
        const new_count = query('tbody').childElementCount;

        assert(init_count < new_count)
    }, 3);

    //correct values dont have invalid class.
    for (let i = 0; i < 4; i++) {
        await test('correct name values do NOT have "invalid" class', async function () {
            const input_value = queryAll('.name > input.data')[i];

            input_value.value = 'name' + i;
            input_value.dispatchEvent(new Event('input'));

            assert(!input_value.classList.contains('invalid'))
        });

        await test('blank email values do NOT have "invalid" class', async function () {
            const input_value = queryAll('.email > input.data')[i];

            input_value.value = `username${i}@domain${i}.${'x'.repeat(i + 1)}`;
            input_value.dispatchEvent(new Event('input'));

            assert(!input_value.classList.contains('invalid'))
        });

        await test('blank level values do NOT have "invalid" class', async function () {
            const input_value = queryAll('.level > input.data')[i];
            const levels = ['freshman', 'sophomore', 'junior', 'senior'];

            input_value.value = levels[i];
            input_value.dispatchEvent(new Event('input'));

            assert(!input_value.classList.contains('invalid'))
        });
    }

    //incorrect values do have invalid class.
    for (let i = 0; i < 2; i++) {

        await test('blank name values have "invalid" class', async function () {
            const input_value = queryAll('.name > input.data')[i];

            input_value.value = '';
            input_value.dispatchEvent(new Event('input'));

            assert(input_value.classList.contains('invalid'))
        });

        await test('blank email values have "invalid" class', async function () {
            const input_value = queryAll('.email > input.data')[i];

            input_value.value = '';
            input_value.dispatchEvent(new Event('input'));

            assert(input_value.classList.contains('invalid'))
        });

        await test('blank level values have "invalid" class', async function () {
            const input_value = queryAll('.level > input.data')[i];

            input_value.value = '';
            input_value.dispatchEvent(new Event('input'));

            assert(input_value.classList.contains('invalid'))
        });
    }

    await test('email values missing tld do have "invalid" class', async function () {
        const input_value = queryAll('.email > input.data')[0];

        input_value.value = `username@domain.`;
        input_value.dispatchEvent(new Event('input'));

        assert(input_value.classList.contains('invalid'))
    });

    await test('email values missing username do have "invalid" class', async function () {
        const input_value = queryAll('.email > input.data')[1];

        input_value.value = `@domain.com`;
        input_value.dispatchEvent(new Event('input'));

        assert(input_value.classList.contains('invalid'))
    });

    await test('email values missing domain do have "invalid" class', async function () {
        const input_value = queryAll('.email > input.data')[2];

        input_value.value = `username@.com`;
        input_value.dispatchEvent(new Event('input'));

        assert(input_value.classList.contains('invalid'))
    });

    await test('email values missing "@" do have "invalid" class', async function () {
        const input_value = queryAll('.email > input.data')[2];

        input_value.value = `usernamedomain.com`;
        input_value.dispatchEvent(new Event('input'));

        assert(input_value.classList.contains('invalid'))
    });

    await test('email values missing "." do have "invalid" class', async function () {
        const input_value = queryAll('.email > input.data')[2];

        input_value.value = `username@domaincom`;
        input_value.dispatchEvent(new Event('input'));

        assert(input_value.classList.contains('invalid'))
    });

    await test('delete row button deletes row', async function () {
        const initial_row_count = query('tbody').childElementCount;
        const remove_row_btn = /**@type {HTMLElement}*/(query('tbody').children[0].children[3]);

        //delete first row
        remove_row_btn.click()
        const new_row_count = query('tbody').childElementCount;

        assert(initial_row_count > new_row_count) //should have less rows than when we started
    }, 3);

    await test('download/upload table options menu is hidden by default', async function () {

        query('#options').classList.add('hide');
        await delay(1000); //wait for animation to finish
        let div_y = query('#options').getClientRects()[0].y;

        assert(div_y < 0);
    });

    await test('clicking lab icon opens download/upload table options menu', async function () {
        query('#header-icon').click();
        await delay(1000); //wait for animation to finish
        let div_y = query('#options').getClientRects()[0].y;

        assert(div_y > 0);
    });

    await test('clicking lab icon again closes download/upload table options menu', async function () {
        query('#header-icon').click();
        await delay(1000); //wait for animation to finish
        let div_y = query('#options').getClientRects()[0].y;

        assert(div_y < 0);
    });

    //duplicate because sometimes css animation only works first time
    await test('clicking lab icon opens download/upload table options menu', async function () {
        query('#header-icon').click();
        await delay(1000); //wait for animation to finish
        let div_y = query('#options').getClientRects()[0].y;

        assert(div_y > 0);
    });
};


