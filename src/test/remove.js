import test from 'tape';
import fullSelect from './../';

let actual;
let expected;

document.body.innerHTML = '';
const select = document.createElement('select');
select.innerHTML = `
  <option value="">Select...</option>
  <optgroup label="Moto">
    <option value="suzuki">Suzuki</option>
  </optgroup>
  <optgroup label="Auto">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>`;
document.body.appendChild(select);
const fullselect = fullSelect('select')[0];

test('Remove an option', assert => {
  var target = select.children[2].children[1]; // Audi option

  const removed = fullselect.remove(target);

  assert.test('... and the returned option is the same', q => {
    actual = removed;
    expected = target;
    q.deepEqual(actual, expected,
      'the two elements should be the same');
    q.end();
  });

  assert.test('... and the option is not in the select anymore', q => {
    actual = [].indexOf.call(select.options, removed);
    expected = -1;
    q.deepEqual(actual, expected,
      'should be -1');
    q.end();
  });

  assert.test('... and the custom option is not in the panel anymore', q => {
    actual = fullselect.panel.querySelectorAll(`[data-value="${removed.getAttribute('value')}"]`);
    expected = 0;
    q.deepEqual(actual.length, expected,
      'should be 0');
    q.end();
  });

  assert.test('... and the custom options are one less', q => {
    actual = fullselect.panel.getElementsByClassName(fullselect.pluginOptions.optionClass);
    expected = 3;
    q.deepEqual(actual.length, expected,
      'should be 3');
    q.end();
  });
});

test('Remove an option group', assert => {
  var targetGroup = select.children[2]; // Auto option group

  const removedGroup = fullselect.remove(targetGroup);

  assert.test('... and the returned option group is the same', q => {
    actual = removedGroup;
    expected = targetGroup;
    q.deepEqual(actual, expected,
      'the two elements should be the same');
    q.end();
  });

  assert.test('... and the option group is not in the select anymore', q => {
    actual = [].indexOf.call(select.getElementsByTagName('optgroup'),
      removedGroup.fullSelectOriginalOptgroup);
    expected = -1;
    q.deepEqual(actual, expected,
      'should be -1');
    q.end();
  });

  assert.test('... and the custom option group is not in the panel anymore', q => {
    actual = [].indexOf.call(select.getElementsByTagName(fullselect.pluginOptions.optgroupClass),
      removedGroup.fullSelectOriginalOptgroup);
    expected = -1;
    q.deepEqual(actual, expected,
      'should be -1');
    q.end();
  });
});

test('Remove: Use a string as the parameter', assert => {
  assert.throws(() => { select.parentNode.fullSelect.remove('a string'); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Remove: Use an invalid HTMLElement parameter', assert => {
  const option = document.createElement('option');
  assert.throws(() => { select.parentNode.fullSelect.remove(option); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Remove: Use undefined as parameter', assert => {
  assert.throws(() => { select.parentNode.fullSelect.remove(undefined); }, TypeError,
    'should throw TypeError');
  assert.end();
});
