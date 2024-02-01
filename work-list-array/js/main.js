// База данных
let listData = [
    {
        name: 'Пётр',
        surename: 'Алексеевич',
        lastname: 'Сите',
        age: '34',
        hobby: 'Танцы'
    },
    {
        name: 'Никита',
        surename: 'Андреевич',
        lastname: 'Мурин',
        age: '38',
        hobby: 'Хоккей'
    },
    {
        name: 'Юлия',
        surename: 'Петровна',
        lastname: 'Сацюк',
        age: '19',
        hobby: 'Спорт'
    },
    {
        name: 'Максим',
        surename: 'Алексеевич',
        lastname: 'Янчи',
        age: '26',
        hobby: 'Велоспорт'
    },
    {
        name: 'Анна',
        surename: 'Вадимовна',
        lastname: 'Шпак',
        age: '24',
        hobby: 'Программирование'
    }]

let sortColumFlag = 'fio',
    sortDirFlag = true

// Создание элементов
const $app = document.getElementById('app'),
    $addForm = document.getElementById('add-form'),
    $nameInp = document.getElementById('add-form_name-inp'),
    $surenameInp = document.getElementById('add-form_surename-inp'),
    $lastnameInp = document.getElementById('add-form_lastname-inp'),
    $ageInp = document.getElementById('add-form_age-inp'),
    $hobbyInp = document.getElementById('add-form_hobby-inp'),
    $sortFIOBtn = document.getElementById('sort-fio'),
    $sortAgeBtn = document.getElementById('sort-age'),


    $filterForm = document.getElementById('filter-form'),
    $nameFilterInp = document.getElementById('filter-form-name-inp'),
    $hobbyFilterInp = document.getElementById('filter-form-hobby-inp'),

    //Создаем таблицу элементов
    $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody');
$tableHeadTr = document.createElement('tr'),
    $tableHeadThFIO = document.createElement('th'),
    $tableHeadThAge = document.createElement('th'),
    $tableHeadThBirthYear = document.createElement('th'),
    $tableHeadThHobby = document.createElement('th');

$table.classList.add('table', 'table-primary')

$tableHeadThFIO.textContent = 'ФИО'
$tableHeadThAge.textContent = 'Возраст'
$tableHeadThBirthYear.textContent = 'Год рождения'
$tableHeadThHobby.textContent = 'Хобби'

// Вкладываем строки Th в столбец Tr
$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThAge)
$tableHeadTr.append($tableHeadThBirthYear)
$tableHeadTr.append($tableHeadThHobby)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)

function createUserTr(oneUser) {
    const $userTr = document.createElement('tr'),
        $userFIO = document.createElement('th'),
        $userAge = document.createElement('th'),
        $userBirthYear = document.createElement('th'),
        $userHobby = document.createElement('th');

    $userFIO.textContent = oneUser.fio
    $userAge.textContent = oneUser.age
    $userBirthYear.textContent = oneUser.birthYear
    $userHobby.textContent = oneUser.hobby

    // Вкладываем строки Th в столбец Tr
    $userTr.append($userFIO)
    $userTr.append($userAge)
    $userTr.append($userBirthYear)
    $userTr.append($userHobby)
    $tableBody.append($userTr)

    return ($userTr)
}


// Рендер (отрисовка)
function render() {
    $tableBody.innerHTML = ''
    // Подготовка
    let copylistData = [...listData]

    for (const oneUser of copylistData) {
        oneUser.fio = oneUser.name + ' ' + oneUser.surename + ' ' + oneUser.lastname
        oneUser.birthYear = 2024 - oneUser.age
    }

    // Сортировка
    copylistData = copylistData.sort(function (a, b) {
        let sort = a[sortColumFlag] < b[sortColumFlag]
        if (sortDirFlag == false) sort = a[sortColumFlag] > b[sortColumFlag]
        if (sort) return -1
    })

    // Фильтрация
if ($nameFilterInp.value.trim() !=='')
 {copylistData = copylistData.filter(function(oneUser) {
        if(oneUser.name.includes($nameFilterInp.value.trim())) return true
              });
}
if ($hobbyFilterInp.value.trim() !=='')
{copylistData = copylistData.filter(function(oneUser) {
       if(oneUser.hobby.includes($hobbyFilterInp.value.trim())) return true
             });
}

    // Отрисовка
    for (const oneUser of copylistData) {
        const $newTr = createUserTr(oneUser)
        $tableBody.append($newTr)
    }
}
render();

//Добавление

$addForm.addEventListener('submit', function (event) {
    event.preventDefault()
    // Валидация для проверки значения(число или нет)
    if ($nameInp.value.trim() == '') {
        alert('Имя не введено.')
        return
    }
    if ($surenameInp.value.trim() == '') {
        alert('Отчество не введено.')
        return
    }
    if ($lastnameInp.value.trim() == '') {
        alert('Фамилия не введена.')
        return
    }
    if ($ageInp.value.trim() == '') {
        alert('Возраст не введен.')
        return
    }
    if ($hobbyInp.value.trim() == '') {
        alert('Данные не введены.')
        return
    }

    listData.push(
        {
            name: $nameInp.value.trim(),
            surename: $surenameInp.value.trim(),
            lastname: $lastnameInp.value.trim(),
            age: parseInt($ageInp.value.trim()),
            hobby: $hobbyInp.value.trim()
        })
    render()
})

// Событие (клики) сортировки

$sortFIOBtn.addEventListener('click', function () {
    sortColumFlag = 'fio'
    sortDirFlag = !sortDirFlag
    render()
})

$sortAgeBtn.addEventListener('click', function () {
    sortColumFlag = 'age'
    sortDirFlag = !sortDirFlag
    render()
})
// Фильтр
$filterForm.addEventListener('submit', function (event) {
    event.preventDefault()
})
$nameFilterInp.addEventListener('input', function () {
    render()

})
$hobbyFilterInp.addEventListener('input', function () {
    render()

})