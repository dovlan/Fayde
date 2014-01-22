import PrimitivesTests = require("tests/PrimitivesTests");
import TypeConverterTests = require("tests/TypeConverterTests");
import MarkupExpressionTests = require("tests/MarkupExpressionTests");
import XamlNodeTests = require("tests/XamlNodeTests");
import ProviderTests = require("tests/ProviderTests");
import XamlLoadTests = require("tests/XamlLoadTests");
import TransformTests = require("tests/TransformTests");
import TimelineTests = require("tests/TimelineTests");
import ItemsControlTests = require("tests/ItemsControlTests");
import BindingTests = require("tests/BindingTests");
import UriMapperTests = require("tests/UriMapperTests");

export function run() {
    PrimitivesTests.run();
    TypeConverterTests.run();
    MarkupExpressionTests.run();
    XamlNodeTests.run();
    ProviderTests.run();
    XamlLoadTests.run();
    TransformTests.run();
    TimelineTests.run();
    ItemsControlTests.run();
    BindingTests.run();
    UriMapperTests.run();

    QUnit.load();
    QUnit.start();
}