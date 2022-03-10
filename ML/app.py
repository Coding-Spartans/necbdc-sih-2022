import pandas as pd
import numpy as np
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(_name_)
CORS(app)


@app.route('/post', methods=["POST"])
def test():

    df1 = pd.read_csv('last.csv')

    df1 = df1[0:522]

    df1 = df1.dropna()

    X = df1.drop(['Profession'], axis=1)
    y = df1['Profession']

    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=101)

    from sklearn.ensemble import RandomForestClassifier
    rfc = RandomForestClassifier(
        n_estimators=128, max_features=4, bootstrap=False, oob_score=False, random_state=42)
    rfc.fit(X_train, y_train)
    y_pred = rfc.predict(X_test)

    arr_json = request.get_json(force=True)
    l = arr_json["input"]
    print(l)
    profession = rfc.predict([l])[0]

    df2 = pd.read_csv('Profession-data.csv')

    for pro in df2['Profession']:
        if(pro == profession):
            mean = df2[df2['Profession'] == pro]['Avg Salary'].mean()
            break

    for pro in df2['Profession']:
        if(pro == profession):
            # print(pro)
            prediction = pro
            df2 = df2[df2['Profession'] == profession][[
                'Profession', 'CareerPath1', 'CareerPath2', 'CareerPath3']]
            break

    arr1 = ""
    arr = df2.values.tolist()
    if(profession != 'DataScientist'):
        arr1 = arr

    else:
        from mlxtend.preprocessing import TransactionEncoder
        from mlxtend.frequent_patterns import apriori
        from mlxtend.frequent_patterns import association_rules
        te = TransactionEncoder()
        te_ary = te.fit(arr).transform(arr)
        dfff = pd.DataFrame(te_ary, columns=te.columns_)
        frequent_itemsets = apriori(dfff, min_support=0.3, use_colnames=True)
        res = association_rules(
            frequent_itemsets, metric='confidence', min_threshold=0.7)
        res = res[['antecedents', 'consequents', 'antecedent support',
                   'consequent support', 'support', 'confidence', 'lift', 'leverage', 'conviction']]
        print(res)
        res = res[res['lift'] == res['lift'].max()]
        res = res[res['support'] == res['support'].max()]
        lis = []
        pos = 0
        for i in res['antecedents']:
            for j in i:
                if(j == profession):
                    lis.append(pos)
            pos += 1
        lis
        d = res[['antecedents', 'consequents']]
        whole = []
        whole1 = []
        for i in lis:
            ante = res['antecedents'].iloc[i]
            ante = list(ante)
            ante.reverse()
            conse = res['consequents'].iloc[i]
            conse = list(conse)
            conse.reverse()
            for i in ante:
                whole.append(i)
            for i in conse:
                whole.append(i)
            whole1.append(whole)
            whole = []

    jesonified = f'{{"prediction":"{pro}","whole1":{json.dumps(arr1)},"mean":{mean}}}'
    return jesonified
